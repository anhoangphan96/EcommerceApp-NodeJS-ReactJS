const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/user");
const validate = require("../Controllers/validation");

router.post("/signup", validate.validateSignup(), userControllers.userSignup);
router.post("/login", validate.validateLogin(), userControllers.userLogin);
router.get("/infor", userControllers.checkLogin);
router.post("/addcart", userControllers.postAddCart);
router.get("/listcart", userControllers.getListCart);
router.post("/updatecart", userControllers.updateCart);
router.post("/deletecart", userControllers.deleteCartItem);
router.get("/userlogout", userControllers.userLogout);

router.post(
  "/adminlogin",
  validate.validateLogin(),
  userControllers.adminLogin
);
router.get("/numofclient", userControllers.numofclient);
router.get("/adminlogout", userControllers.adminLogout);
module.exports = router;
