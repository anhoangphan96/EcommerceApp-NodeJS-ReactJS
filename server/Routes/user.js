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
  "/addcart", //Thêm sản phẩm vào cart

  userControllers.postAddCart
);
router.get(
  "/listcart", // Lấy list cart của user
  authorControllers.clientRoleAuthor,
  userControllers.getListCart
);
router.post(
  "/updatecart", //Cập nhật cart
  authorControllers.clientRoleAuthor,
  userControllers.updateCart
);
router.post(
  "/deletecart", //Xóa sản phẩm trong cart
  authorControllers.clientRoleAuthor,
  userControllers.deleteCartItem
);
router.get(
  "/userlogout", //user logout
  userControllers.userLogout
);

//Các router cho trang admin
router.get(
  "/listuser", //Lấy list user
  authorControllers.adminRoleAuthor,
  userControllers.getListUser
);
router.get(
  "/numofclient", //Lấy số lượt user role là client
  authorControllers.adminRoleAuthor,
  userControllers.numofclient
);

router.get(
  "/adminlogout", //chức năng log out // Vì logout sẻ thoát hết chức năng nên không cần check authorize
  userControllers.adminLogout
);
router.put(
  "/setrole", //Set role cho user
  authorControllers.adminRoleAuthor,
  userControllers.setRole
);
module.exports = router;
