//khai báo các biến và thư viện cần thiết
const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/user");
const validate = require("../Controllers/validation");
const authorControllers = require("../Controllers/authorization");

//Các router sign up và login vì user chưa đăng nhập nên không cần authorize, (phần đăng nhập cũng bao gồm check các thông tin trong authorize tương ứng)
router.post("/signup", validate.validateSignup(), userControllers.userSignup);
router.post("/login", validate.validateLogin(), userControllers.userLogin);
router.post(
  "/adminlogin",
  validate.validateLogin(),
  userControllers.adminLogin
);

//Các router cho trang client
router.get(
  "/infor",
  authorControllers.clientRoleAuthor,
  userControllers.checkLogin
);
router.post(
  "/addcart",
  authorControllers.clientRoleAuthor,
  userControllers.postAddCart
);
router.get(
  "/listcart",
  authorControllers.clientRoleAuthor,
  userControllers.getListCart
);
router.post(
  "/updatecart",
  authorControllers.clientRoleAuthor,
  userControllers.updateCart
);
router.post(
  "/deletecart",
  authorControllers.clientRoleAuthor,
  userControllers.deleteCartItem
);
router.get(
  "/userlogout",
  authorControllers.clientRoleAuthor,
  userControllers.userLogout
);

//Các router cho trang admin
router.get(
  "/listuser",
  authorControllers.adminRoleAuthor,
  userControllers.getListUser
);
router.get(
  "/numofclient",
  authorControllers.adminRoleAuthor,
  userControllers.numofclient
);
router.get(
  "/adminlogout",
  authorControllers.adminRoleAuthor,
  userControllers.adminLogout
);
router.put(
  "/setrole",
  authorControllers.adminRoleAuthor,
  userControllers.setRole
);
module.exports = router;
