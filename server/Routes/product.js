const express = require("express");
const router = express.Router();
const multer = require("multer");
const productControllers = require("../Controllers/product");
const validate = require("../Controllers/validation");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
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
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("pictures", 5),
  productControllers.middlewareHandleBody,
  validate.productForm(),
  productControllers.createProduct
);
router.get("/formupdate/:id", productControllers.getOneProdFormData);
router.post(
  "/formupdate/:id",
  validate.productForm(),
  productControllers.updateOneProduct
);
router.delete("/delete", productControllers.deleteOneProduct);

// router.get("/addcount", productControllers.setCountToAll); //just use one time to add count field to all product
module.exports = router;
