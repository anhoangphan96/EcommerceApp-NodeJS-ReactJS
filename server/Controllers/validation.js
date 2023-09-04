const { body, query } = require("express-validator");
const User = require("../Models/User");
exports.validateSignup = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("This is not validated Email")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
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
    body("email").isEmail().withMessage("This is not validated Email").trim(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Your password must be more than 8 characters")
      .trim(),
  ];
};

exports.orderForm = () => {
  return [
    body("email").isEmail().withMessage("This is not validated Email").trim(),
    body("phone", "Your phone number must have 10 numeric digits")
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
    body("fullName").notEmpty().withMessage("Please input your name"),
    body("address").notEmpty().withMessage("Please input your address"),
  ];
};

exports.productForm = () => {
  return [
    body("name").notEmpty().withMessage("Please input name"),
    body("category").notEmpty().withMessage("Please input category"),
    body("price")
      .isInt({ min: 0 })
      .withMessage("Please input non-negative integer price"),
    body("count")
      .isInt({ min: 0 })
      .withMessage("Please input non-negative integer count"),
    body("shortDesc").notEmpty().withMessage("Please input short description"),
    body("longDesc").notEmpty().withMessage("Please input long description"),
  ];
};
