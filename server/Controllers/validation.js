const { body, query } = require("express-validator");
const User = require("../Models/User");
exports.validateSignup = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Email is not validated")
      .custom(async (value) => {
        console.log(value);
        const user = await User.findOne({ email: value });
        console.log(user);
        if (user) {
          throw new Error("This email has been used, please use the other");
        } else {
          return true;
        }
      })
      .trim(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Your password must be more than 8 characters")
      .trim(),
    body("phone", "Your phone number must have 10 numeric digits")
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
    body("name").notEmpty().withMessage("Please input your name"),
  ];
};
exports.validateLogin = () => {
  return [
    body("email").isEmail().withMessage("Email is not validated").trim(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Your password must be more than 8 characters")
      .trim(),
  ];
};

exports.orderForm = () => {
  return [
    body("email").isEmail().withMessage("Email is not validated").trim(),
    body("phone", "Your phone number must have 10 numeric digits")
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
    body("fullName").notEmpty().withMessage("Please input your name"),
    body("address").notEmpty().withMessage("Please input your address"),
  ];
};
