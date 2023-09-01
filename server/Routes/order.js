const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/order");
const authorControllers = require("../Controllers/authorization");
const validate = require("../Controllers/validation");

router.post(
  "/create",
  authorControllers.clientRoleAuthor,
  validate.orderForm(),
  orderControllers.postCreateOrder
);
router.get(
  "/hislist",
  authorControllers.clientRoleAuthor,
  orderControllers.getHistoryList
);
router.get(
  "/detail/:id",
  authorControllers.clientRoleAuthor,
  orderControllers.getOrderDetail
);

router.get("/getall", orderControllers.getAll);
router.get("/lastest8", orderControllers.getLatest8);
module.exports = router;
