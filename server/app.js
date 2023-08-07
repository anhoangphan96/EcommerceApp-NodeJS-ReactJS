const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();

const userRoute = require("./Routes/user");
const productRoute = require("./Routes/product");
const orderRoute = require("./Routes/order");

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);

app.use(bodyParser.json());
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

mongoose
  .connect(
    `mongodb+srv://anphfx21936:Hoangan512@cluster0.3v63j0d.mongodb.net/ecommerceApp`
  )
  .then((result) => {
    console.log("Connected");
    app.listen(5000);
  })
  .catch((err) => console.log(err));
