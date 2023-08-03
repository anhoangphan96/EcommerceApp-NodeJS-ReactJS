const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const userRoute = require("./Routes/user");

app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/user", userRoute);

mongoose
  .connect(
    `mongodb+srv://anphfx21936:Hoangan512@cluster0.3v63j0d.mongodb.net/ecommerceApp`
  )
  .then((result) => {
    console.log("Connected");
    app.listen(5000);
  })
  .catch((err) => console.log(err));
