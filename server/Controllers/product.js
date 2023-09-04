const Product = require("../Models/Product");
const Order = require("../Models/Order");
const { validationResult } = require("express-validator");

//Controller lấy toàn bộ product để fetch cho homepage và shoppage
exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((result) => res.status(200).json(result))
    //Trả về status 500 nếu có lỗi hệ thống
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Controller để lấy thông tin chi tiết của 1 product fetch cho trang product detail
exports.getProdDetail = (req, res, next) => {
  //Lấy id từ url param id
  const prodId = req.params.id;
  //Tìm và trả kết quả
  Product.findOne({ _id: prodId })
    .then((result) => res.status(200).json(result))
    //Trả về status 500 nếu có lỗi hệ thống
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};

//Controller để lấy list product related của 1 product fetch cho trang product detail
exports.getRelatedProds = (req, res, next) => {
  const category = req.query.category;
  const prodIdCur = req.query.id;
  //Tìm kiếm list product cùng category và loại trừ productId hiện tại
  Product.find({ category: category, _id: { $ne: prodIdCur } })
    .then((result) => res.status(200).json(result))
    //Trả về status 500 nếu có lỗi hệ thống
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Controller để tạo 1 product mới có thêm param err để bắt error khi multer xử lý file tải lên có vấn đề (vượt quá 5 file)
exports.createProduct = (req, res, next) => {
  //Check validate các input xem có lỗi không nếu có sẽ trả về status 400 và lỗi để hiển thị cho user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
    const dataText = req.body;
    const pictures = req.files;
    //Kiểm tra xem người dùng đã input picture chưa nếu pictureslength = 0 thì chưa input hoặc sai type
    if (pictures.length === 0) {
      res
        .status(422)
        .json({ message: "Please input 1-5 pictures(.png, .jpg, .jpeg file)" });
    } else {
      //Nếu tất cả không có lỗi thì sẽ tiến hành tạo product mới
      const dataProduct = {
        category: dataText.category,
        long_desc: dataText.longDesc,
        name: dataText.name,
        price: dataText.price,
        count: dataText.count,
        short_desc: dataText.shortDesc,
      };
      //dùng method forEach để lập qua thêm các link url static chứa các picture
      pictures.forEach((pic, i) => {
        const picName = `img${i + 1}`;
        dataProduct[picName] =
          "http://localhost:5000/" + pic.path.replace(/\\/g, "/");
      });
      const newProduct = new Product(dataProduct);
      newProduct
        .save()
        //Thông báo tạo product thành công status 201 hoặc trả về status 500 nếu có lỗi hệ thống
        .then((result) => {
          res
            .status(201)
            .json({ message: "You product has been created successfully!" });
        })
        .catch((err) => {
          const error = new Error(err);
          res.status(500).json(error);
        });
    }
  }
};

//Controller để lấy data fetch vào from cho việc update
exports.getOneProdFormData = (req, res, next) => {
  const prodId = req.params.id;
  //tìm prorduct theo url param id và trả về cho người dùng
  Product.findOne({ _id: prodId })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Controller update data của product, do update chúng ta không sửa đổi picture nên không xét field picture trong controller này
exports.updateOneProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
    //Validate các lỗi input như ở create nếu không có lỗi thì tiến hành update data
    const prodId = req.params.id;
    const nameUpdated = req.body.name;
    const categoryUpdated = req.body.category;
    const priceUpdated = req.body.price;
    const countUpdated = req.body.count;
    const shortDescUpdated = req.body.shortDesc;
    const longDescUpdated = req.body.longDesc;
    const updatedProduce = {
      category: categoryUpdated,
      long_desc: longDescUpdated,
      name: nameUpdated,
      price: priceUpdated,
      count: countUpdated,
      short_desc: shortDescUpdated,
    };
    //gọi method update và trả về status 201 nếu thành công lỗi hệ thống trả về status 500
    Product.findByIdAndUpdate(prodId, updatedProduce, { new: true })
      .then((result) => {
        return res.status(200).json({ message: "Updated succesfully!" });
      })
      .catch((err) => {
        const error = new Error(err);
        res.status(500).json(error);
      });
  }
};
//Controller để xóa 1 product theo id
exports.deleteOneProduct = (req, res, next) => {
  const prodId = req.query.id;
  //Check xem product này có đang thực hiện trong order nào không, nếu có thì báo lỗi không thể xóa, còn nếu không thì xóa
  Order.findOne({ items: { $elemMatch: { productId: prodId } } })
    .then((result) => {
      if (!result) {
        return Product.findByIdAndDelete(prodId);
      }
    })
    //Nếu như block ở trên có return thì result ở block tiếp theo sẽ có và ngược lại thì báo items này đang được process k thể xóa
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ message: "Deleted successfully! Click close to finish!" });
      } else {
        res.status(400).json({
          message:
            "This product has been processing in order,You can't delete it",
        });
      }
    })
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Add count field to all products, just use one time (chỉ dùng 1 lần lúc mới thêm field count)
exports.setCountToAll = (req, res, next) => {
  Product.updateMany({}, { $set: { count: 99 } }, { upsert: false })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Count has been added to all Products!" });
    })
    .catch((err) => console.log(err));
};

//Middleware để parse và lưu data phần input là text vào req.body
exports.middlewareHandleBody = (req, res, next) => {
  req.body = JSON.parse(req.body.dataText);
  next();
};
