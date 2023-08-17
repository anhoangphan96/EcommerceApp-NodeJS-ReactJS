const Product = require("../Models/Product");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

exports.getProdDetail = (req, res, next) => {
  const prodId = req.params.id;
  Product.findOne({ _id: prodId })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
exports.getRelatedProds = (req, res, next) => {
  const category = req.query.category;
  const prodIdCur = req.query.id;
  Product.find({ category: category, _id: { $ne: prodIdCur } })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

exports.createProduct = (req, res, next) => {
  const dataText = JSON.parse(req.body.dataText);
  const pictures = req.file;
  console.log(pictures);
  const newProduct = new Product({
    category: dataText.category,
    img1: "http://localhost:5000/" + pictures.path.replace(/\\/g, "/"),
    long_desc: dataText.longDesc,
    name: dataText.name,
    price: "500000",
    short_desc: dataText.shortDesc,
  });
  newProduct
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "You image has been created successfully!" });
    })
    .catch((err) => console.log(err));
};
exports.getOneProdFormData = (req, res, next) => {
  const prodId = req.params.id;
  Product.findOne({ _id: prodId })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

exports.updateOneProduct = (req, res, next) => {
  const prodId = req.params.id;
  const nameUpdated = req.body.name;
  const categoryUpdated = req.body.category;
  const priceUpdated = req.body.price;
  const shortDescUpdated = req.body.shortDesc;
  const longDescUpdated = req.body.longDesc;
  const updatedProduce = {
    category: categoryUpdated,
    long_desc: longDescUpdated,
    name: nameUpdated,
    price: priceUpdated,
    short_desc: shortDescUpdated,
  };
  console.log(updatedProduce);
  Product.findByIdAndUpdate(prodId, updatedProduce, { new: true })
    .then((result) => {
      return res.status(200).json({ message: "Updated succesfully!" });
    })
    .catch((err) => console.log(err));
};
exports.deleteOneProduct = (req, res, next) => {
  const prodId = req.query.id;
  Product.findByIdAndDelete(prodId)
    .then((result) =>
      res.status(200).json({ message: "Deleted successfully!" })
    )
    .catch((err) => console.log(err));
};
