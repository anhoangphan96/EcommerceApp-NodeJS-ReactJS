const express = require("express");
const router = express.Router();
const multer = require("multer");
const productControllers = require("../Controllers/product");
const validate = require("../Controllers/validation");
const authorization = require("../Controllers/authorization");
//Khai báo fileStorage để dùng trong multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); //Nơi lưu
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname); //Tên file sẽ lưu
  },
});
//Khai báo filefilter để lọc ra file có dạng hình ảnh
const fileFilter = (req, file, cb) => {
  if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//Khai báo middleware handle error nếu multer có lỗi
const multerErrorHandling = (err, req, res, next) => {
  //Kiểm tra xem người dùng input vượt quá số file cho phép hay không
  if (err instanceof multer.MulterError) {
    res
      .status(422)
      .json({ message: "Please input 1-5 pictures(.png, .jpg, .jpeg file)" });
  } else {
    next();
  }
};

//Các route sẽ sử dụng ở trang client, client không cần phải authorize cũng xem được các route này
router.get("/getall", productControllers.getAllProducts);
router.get("/detail/:id", productControllers.getProdDetail);
router.get("/relate", productControllers.getRelatedProds);

//Các router product sử dụng ở trang admin, cần check author role admin cho các router này
router.post(
  "/create", //Tạo 1 sản phẩm mới
  authorization.adminRoleAuthor,
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("pictures", 5), //dùng middleware multer để xử lý ảnh upload lên server tối đa 5 ảnh
  multerErrorHandling, //middleware handle error of multer
  productControllers.middlewareHandleBody, //middleware để lưu phần data Text trong formdata vào req.body
  validate.productForm(), //validate phần data Text vừa lưu ở trên xem input có lỗi không
  productControllers.createProduct
);
router.get(
  "/formupdate/:id", //Lấy data của 1 sản phẩm để fetch vào form
  authorization.adminRoleAuthor,
  productControllers.getOneProdFormData
);
router.post(
  "/formupdate/:id", //Post update data của 1 sản phẩm
  authorization.adminRoleAuthor,
  validate.productForm(),
  productControllers.updateOneProduct
);
router.delete(
  "/delete", //Xóa 1 sản phẩm
  authorization.adminRoleAuthor,
  productControllers.deleteOneProduct
);

// router.get("/addcount", productControllers.setCountToAll); //just use one time to add count field to all product
module.exports = router;
