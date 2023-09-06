const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();
const ChatMessage = require("./Models/ChatMessages");
const userRoute = require("./Routes/user");
const productRoute = require("./Routes/product");
const orderRoute = require("./Routes/order");
const chatRoute = require("./Routes/chat");
//Config cors (port 3000 chạy client app, 3001 chạy admin app)
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.CLIENT_APP_LOCAL,
      process.env.CLIENT_APP_FIREBASE1,
      process.env.CLIENT_APP_FIREBASE2,
      process.env.ADMIN_APP_LOCAL,
      process.env.ADMIN_APP_FIREBASE1,
      process.env.ADMIN_APP_FIREBASE2,
      process.env.CLIENT_APP_VERCEL,
    ],
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  })
);

//Gọi bodyParser để parse các body truyền đến server dưới dạng json
app.use(bodyParser.json());

//middleware để các client-side có thể truy cập hình ảnh trong thư mục public của server
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public", "images"))
);
// app.set("trust proxy", true);
//config session
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    // proxy: "true",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // thời gian sống của cookie do session gửi trả client-side là 30 ngày
      // secure: true,
      // sameSite: "none",
    },
  })
);
//Khai báo các middleware để connect app đến các route tương ứng
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/chat", chatRoute);
//Connect MongoDB bằng moongose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3v63j0d.mongodb.net/${process.env.DB_NAME}`
  )
  .then((result) => {
    console.log("Connected");
    const server = app.listen(process.env.PORT || 5000);
    //Kết nối socketio
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      //Khi có 1 client kết nối đến room thì sẽ emit sự kiện setRoom, server sẽ lắng nghe sự kiện và kết nối đến room cho người dùng
      socket.on("setRoom", (data) => {
        socket.join(data.roomId);
        //Nếu đang có room đang mở tương ứng với roomId mà người dùng emit thì kết nối bth,
        //Còn nếu không có thì tạo 1 roomChat mới và emit sự kiện có room mới để trang admin cập nhật có người dùng mới vào
        ChatMessage.findOne({ roomId: data.roomId, status: "open" })
          .then((result) => {
            if (!result) {
              ChatMessage.create({
                roomId: data.roomId,
                clientId: data.clientId,
              })
                //Sau khi tạo 1 room mới ở database thì emit event cho admin page biết để hiện room mới lên list room
                .then((result) => {
                  io.emit("haveNewRoom", data.roomId);
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      });

      //Lắng nghe sự kiện gửi tin nhắn để cập nhật vào database,
      // nếu đó là "/end" thì sẽ chuyển status thành close của room đó và emit sự kiện close room để frontend xử lý cloose.
      socket.on("sendMessage", (data) => {
        if (data.message === "/end") {
          ChatMessage.findOneAndUpdate(
            { roomId: data.roomId },
            {
              status: "close",
            },
            { new: true }
          )
            .then((result) => {
              io.to(data.roomId).emit("endRoom", result);
            })
            .catch((err) => console.log(err));
        } else {
          ChatMessage.findOneAndUpdate(
            { roomId: data.roomId },
            {
              $push: {
                message: {
                  sender: data.sender,
                  text: data.message,
                },
              },
            },
            { new: true }
          )
            .then((result) => {
              io.to(data.roomId).emit("receiveMessage", result);
            })
            .catch((err) => console.log(err));
        }
      });
    });
  })
  .catch((err) => console.log(err));
