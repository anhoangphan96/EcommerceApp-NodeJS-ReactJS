const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/order");

router.post("/create", orderControllers.postCreateOrder);
router.get("/hislist", orderControllers.getHistoryList);
router.get("/detail/:id", orderControllers.getOrderDetail);
module.exports = router;
