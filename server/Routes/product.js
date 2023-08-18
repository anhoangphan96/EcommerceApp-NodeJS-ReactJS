const express = require("express");
const router = express.Router();
const multer = require("multer");
const productControllers = require("../Controllers/product");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.get("/getall", productControllers.getAllProducts);
router.get("/detail/:id", productControllers.getProdDetail);
router.get("/relate", productControllers.getRelatedProds);
router.post(
  "/create",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("pictures"),
  productControllers.createProduct
);
router.get("/formupdate/:id", productControllers.getOneProdFormData);
router.post("/formupdate/:id", productControllers.updateOneProduct);
router.delete("/delete", productControllers.deleteOneProduct);

// router.get("/addcount", productControllers.setCountToAll); //just use one time to add count field to all product
module.exports = router;
