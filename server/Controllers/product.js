const Product = require("../Models/Product");
const { validationResult } = require("express-validator");
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
    const dataText = req.body;
    const pictures = req.files;
    console.log("asdasD", pictures);
    const dataProduct = {
      category: dataText.category,
      long_desc: dataText.longDesc,
      name: dataText.name,
      price: dataText.price,
      short_desc: dataText.shortDesc,
    };
    pictures.forEach((pic, i) => {
      const picName = `img${i + 1}`;
      dataProduct[picName] =
        "http://localhost:5000/" + pic.path.replace(/\\/g, "/");
    });

    const newProduct = new Product(dataProduct);
    newProduct
      .save()
      .then((result) => {
        res
          .status(201)
          .json({ message: "You image has been created successfully!" });
      })
      .catch((err) => console.log(err));
  }
};
exports.getOneProdFormData = (req, res, next) => {
  const prodId = req.params.id;
  Product.findOne({ _id: prodId })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

exports.updateOneProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
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
    Product.findByIdAndUpdate(prodId, updatedProduce, { new: true })
      .then((result) => {
        return res.status(200).json({ message: "Updated succesfully!" });
      })
      .catch((err) => console.log(err));
  }
};
exports.deleteOneProduct = (req, res, next) => {
  const prodId = req.query.id;
  Product.findByIdAndDelete(prodId)
    .then((result) =>
      res.status(200).json({ message: "Deleted successfully!" })
    )
    .catch((err) => console.log(err));
};
//Add count field to all products, just use one time
exports.setCountToAll = (req, res, next) => {
  Product.updateMany({}, { $set: { count: 99 } }, { upsert: false })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Count has been added to all Products!" });
    })
    .catch((err) => console.log(err));
};

exports.middlewareHandleBody = (req, res, next) => {
  req.body = JSON.parse(req.body.dataText);
  next();
};
