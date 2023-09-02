const Order = require("../Models/Order");
const Product = require("../Models/Product");
const User = require("../Models/User");
const nodemailer = require("nodemailer");
const formatPrice = require("../helper/formatPrice");
const { validationResult } = require("express-validator");
const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    port: 465,
    secure: true,
    user: "ecommerceappas3@gmail.com",
    pass: "ujgdmsfprlcdfxfa",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.postCreateOrder = (req, res, next) => {
  const errors = validationResult(req);
  const bodyData = req.body;
  const listProdId = bodyData.items.map((item) => item.productId._id);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
    Product.find({ _id: { $in: listProdId }, count: 0 }).then((result) => {
      if (result.length > 0) {
        res.status(404).json({
          message:
            "There are some products out of stock. Back to cart to check!",
        });
      } else {
        const newOrder = new Order({
          userId: bodyData.userId,
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
          .then((result) => result.populate("items.productId"))
          .then((result) => {
            const styleTableElement = `border: 1px solid black;
            text-align: center ;
            padding:8px;`;
            let cartItemData = "";
            result.items.forEach((cartItem) => {
              Product.findByIdAndUpdate(
                cartItem.productId._id,
                {
                  count: cartItem.productId.count - cartItem.quantity,
                },
                { new: true }
              )
                .then()
                .catch((err) => console.log(err));
              return (cartItemData += `<tr>
                <td style="${styleTableElement} font-size:16px;">${
                cartItem.productId.name
              }</td>
                <td style="${styleTableElement} font-size:16px;"><img src="${
                cartItem.productId.img1
              }" width="80" /></td>
                <td style="${styleTableElement} font-size:16px;">${formatPrice(
                cartItem.productId.price
              )} <br/> VND</td>
                <td style="${styleTableElement} font-size:16px;">${
                cartItem.quantity
              }</td>
                <td style="${styleTableElement} font-size:16px;">${formatPrice(
                cartItem.quantity * cartItem.productId.price
              )}<br/> VND</td>
              </tr>`);
            });
            const htmlTemplate = `
          <h2>Hello ${result.fullName}</h2>
          <h4>Phone: ${result.phone} </h4>
          <h4>Address: ${result.address} </h4>
          <h4>Your order placed at ${result.placedAt.toLocaleString(
            "vi-VN"
          )} contain as below:</h4>
          <table>
          <thead>
            <tr>
              <th style="${styleTableElement}" width="240">PRODUCT</th>
              <th style="${styleTableElement}" width="80">IMAGE</th>
              <th style="${styleTableElement}" width="100">PRICE</th>
              <th style="${styleTableElement}" width="60">QUANTITY</th>
              <th style="${styleTableElement}" width="100">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${cartItemData}
          </tbody>
        </table>
        <h2>Total Amount: <br/> ${formatPrice(result.totalPrice)} VND</h2>
        <h2>Thank You!</h2>
        `;
            mailTransporter.sendMail({
              from: "ecommerceappas3@gmail.com",
              to: `${result.email}`,
              subject: `Confirm your orders #${result._id}`,
              html: htmlTemplate,
            });
            //Sau khi tạo order và gửi mail xong thì ta sẽ clear cart của user
            return User.findById(result.userId);
          })
          //ClearCart xong thì gửi phản hồi thành công.
          .then((user) => {
            user.clearCart();
            res
              .status(200)
              .json({ message: "Your order has placed successfully!" });
          })
          .catch((err) => console.log(err));
      }
    });
  }
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

exports.getLatest8 = (req, res, next) => {
  Order.find()
    .sort({ placedAt: -1 })
    .limit(8)

    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
exports.getAll = (req, res, next) => {
  Order.find()
    .sort({ placedAt: -1 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

//Controller để lấy số order và tính doanh thu theo tháng hiện tại (chỉ tính trong 1 tháng hiện tại không tính tổng)
exports.getRevandOrder = (req, res) => {
  Order.find()
    .then((result) => {
      const numOfOrder = result.length;
      const curMonth = new Date().getMonth();
      const totalRevPerMonth = result.reduce((total, order) => {
        if (order?.placedAt.getMonth() === curMonth) {
          return total + +order.totalPrice;
        } else return total;
      }, 0);

      res
        .status(200)
        .json({ numOfOrder: numOfOrder, totalRevPerMonth: totalRevPerMonth });
    })
    .catch((err) => console.log(err));
};
