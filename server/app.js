const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();
const multer = require("multer");
const ChatMessage = require("./Models/ChatMessages");
const userRoute = require("./Routes/user");
const productRoute = require("./Routes/product");
const orderRoute = require("./Routes/order");
const chatRoute = require("./Routes/chat");

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  })
);

app.use(bodyParser.json());
app.use("/public/images", express.static(path.join("public", "images")));
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // thời gian sống của cookie do session gửi trả client-side là 30 ngày
      httpOnly: true,
    },
  })
);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/chat", chatRoute);
mongoose
  .connect(
    `mongodb+srv://anphfx21936:Hoangan512@cluster0.3v63j0d.mongodb.net/ecommerceApp`
  )
  .then((result) => {
    console.log("Connected");
    const server = app.listen(5000);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      socket.on("setRoom", (data) => {
        socket.join(data.roomId);
        ChatMessage.findOne({ roomId: data.roomId, status: "open" })
          .then((result) => {
            if (!result) {
              return ChatMessage.create({
                roomId: data.roomId,
                clientId: data.clientId,
              });
            }
          })
          .catch((err) => console.log(err));
      });
      socket.on("sendMessage", (data) => {
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
      });
      console.log("Client connected", socket.id);
    });
  })
  .catch((err) => console.log(err));
