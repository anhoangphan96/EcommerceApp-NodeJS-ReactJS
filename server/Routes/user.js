const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/user");

router.post("/access", userControllers.userAcessClient);
router.get("/infor", userControllers.checkLogin);
router.post("/addcart", userControllers.postAddCart);
router.get("/listcart", userControllers.getListCart);
router.post("/updatecart", userControllers.updateCart);
router.post("/deletecart", userControllers.deleteCartItem);
router.get("/userlogout", userControllers.userLogout);

router.post("/adminlogin", userControllers.adminLogin);
router.get("/adminlogout", userControllers.adminLogout);
module.exports = router;
