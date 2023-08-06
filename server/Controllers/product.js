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
