const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/order");
const authorControllers = require("../Controllers/authorization");
const validate = require("../Controllers/validation");

//Các router ở trang user, có kèm các middleware để check authorization
router.post(
  "/create", //Tạo order mới
  authorControllers.clientRoleAuthor,
  validate.orderForm(),
  orderControllers.postCreateOrder
);
router.get(
  "/hislist", //Lấy history list order của user
  authorControllers.clientRoleAuthor,
  orderControllers.getHistoryList
);
router.get(
  "/detail/:id", //Lấy detail của 1 order
  authorControllers.clientRoleAuthor,
  orderControllers.getOrderDetail
);

//Các router ở trang admin, có kèm các middleware để check authorization
router.get(
  "/getall", //Lấy toàn bộ order để hiển thị ở trang admin list order
  authorControllers.adminRoleAuthor,
  orderControllers.getAll
);
router.get(
  "/lastest8", //Lấy toàn 8 order mới nhất để hiển thị ở trang admin dashboard
  authorControllers.adminRoleAuthor,
  orderControllers.getLatest8
);
router.get(
  "/revorder", //Lấy thông tin rev của order theo tháng và toàn bộ order mới tới thời điểm hiện tại
  authorControllers.adminRoleAuthor,
  orderControllers.getRevandOrder
);
module.exports = router;
