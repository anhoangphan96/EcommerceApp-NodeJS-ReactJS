const Order = require("../Models/Order");

exports.postCreateOrder = (req, res, next) => {
  const bodyData = req.body;
  const newOrder = new Order({
    email: bodyData.email,
    fullName: bodyData.fullName,
    phone: bodyData.phone,
    address: bodyData.address,
    items: bodyData.items,
    totalPrice: bodyData.totalPrice,
    status: bodyData.status,
  });
  newOrder
    .save()
    .then((result) => {
      res.status(200).json({ message: "Your order has placed successfully!" });
    })
    .catch((err) => console.log(err));
};

exports.getHistoryList = (req, res, next) => {
  Order.find({ email: req.session.email })
    .sort({ placedAt: -1 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.getOrderDetail = (req, res, next) => {
  const orderId = req.params.id;
  Order.findOne({ _id: orderId })
    .populate("items.productId")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
