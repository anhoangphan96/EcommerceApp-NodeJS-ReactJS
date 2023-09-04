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
//Router dùng chung cho admin và client app, để xem coi user đăng nhập chưa để lấy data của user display lên UI
//Nếu chưa đăng nhập thì k có trả data và không có vấn đề gì vì có 1 số trang không cần đăng nhập vẫn xem được
router.get("/infor", userControllers.checkLogin);

//Các router cho trang client
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
  authorControllers.counselorRoleAuthor, //Ở trang admin có cả counselor và admin logout
  userControllers.adminLogout
);
router.put(
  "/setrole",
  authorControllers.adminRoleAuthor,
  userControllers.setRole
);
module.exports = router;
