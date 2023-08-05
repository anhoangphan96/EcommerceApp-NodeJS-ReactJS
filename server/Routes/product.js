const express = require("express");
const router = express.Router();
const productControllers = require("../Controllers/product");

router.get("/getall", productControllers.getAllProducts);
router.get("/detail/:id", productControllers.getProdDetail);
router.get("/relate", productControllers.getRelatedProds);

module.exports = router;
