const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/order");
const authorControllers = require("../Controllers/authorization");

router.post(
  "/create",
  authorControllers.clientRoleAuthor,
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
module.exports = router;
