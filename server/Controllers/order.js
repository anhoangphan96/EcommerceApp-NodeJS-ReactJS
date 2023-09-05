const Order = require("../Models/Order");
const Product = require("../Models/Product");
require("dotenv").config();
const User = require("../Models/User");
const nodemailer = require("nodemailer");
const formatPrice = require("../helper/formatPrice");
const { validationResult } = require("express-validator");
//Config cho mailTransporter
const mailTransporter = nodemailer.createTransport({
  service: "gmail", //Sử dụng gmail để gửi
  auth: {
    //Các thông tin về authorization để sử dụng gmail service
    port: 465,
    secure: true,
    user: "ecommerceappas3@gmail.com",
    pass: "ujgdmsfprlcdfxfa",
  },
  tls: {
    rejectUnauthorized: false, //Kết nối mà k cần xác thực TLS
  },
});

//Controller tạo mới order
exports.postCreateOrder = (req, res, next) => {
  //validate input của create order form
  const errors = validationResult(req);
  const bodyData = req.body;
  const listProdId = bodyData.items.map((item) => item.productId._id);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
    //Nếu không có lỗi input thì check xem các sản phẩm trong đơn đặt hàng có bị hết hàng không, nếu có thì sẽ trả về status 404 và báo có sản phẩm hết hàng
    Product.find({ _id: { $in: listProdId }, count: 0 }).then((result) => {
      if (result.length > 0) {
        res.status(404).json({
          message:
            "There are some products out of stock. Back to cart to check!",
        });
      } else {
        //Nếu không có lỗi về count (inventory) thì tiếp tục tạo 1 đơn hàng mới
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
            //style cho table trong mail gửi
            const styleTableElement = `border: 1px solid black;
            text-align: center ;
            padding:8px;`;
            let cartItemData = "";
            //Cập nhật số lượng tồn kho sau khi client đặt hàng
            result.items.forEach((cartItem) => {
              Product.findByIdAndUpdate(
                cartItem.productId._id,
                {
                  count: cartItem.productId.count - cartItem.quantity,
                },
                { new: true }
              ).catch((err) => {
                throw new Error(err);
              });
              //Trả về template html để gửi mail cho khách ứng với mỗi item
              return (cartItemData += `<tr>
                <td style="${styleTableElement} font-size:16px;">${
                cartItem.productId.name
              }</td>
                <td style="${styleTableElement} font-size:16px;"><img src="${
                cartItem.productId.img1.includes("https://firebasestorage")
                  ? cartItem.productId.img1
                  : process.env.REACT_APP_BACKEND_URL + cartItem.productId.img1
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
            //Template tổng thể của cả mail phần tbody sẽ được lắp bởi cartItemData là template html của từng item
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
            //Sau khi có đủ data thì ta dùng method sendMail để gửi email đến người đặt hàng
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
          //Nếu có lỗi của server thì gửi phản hồi status 500 cùng với error
          .catch((err) => {
            const error = new Error(err);
            res.status(500).json(error);
          });
      }
    });
  }
};
//Controller để fetch data history list cũa user
exports.getHistoryList = (req, res, next) => {
  //Tìm bằng email của người dùng đang đăng nhập được lưu trong session và sắp xếp theo thứ tự ngày đặt hàng gần nhất
  Order.find({ email: req.session.email })
    .sort({ placedAt: -1 })
    .then((result) => {
      res.status(200).json(result);
    })
    //Nếu có lỗi của server thì gửi phản hồi status 500 cùng với error
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Controller fetch detail của 1 order khi user click view detail
exports.getOrderDetail = (req, res, next) => {
  //Lấy orderId từ url param id
  const orderId = req.params.id;
  //Tìm và gửi phản hồi thông tin của order cho user
  Order.findOne({ _id: orderId })
    .populate("items.productId")
    .then((result) => {
      res.status(200).json(result);
    })
    //Nếu có lỗi của server thì gửi phản hồi status 500 cùng với error
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Controller lấy 8 order mới nhất để hiển thị ở admin dashboard
exports.getLatest8 = (req, res, next) => {
  Order.find()
    .sort({ placedAt: -1 })
    .limit(8)
    .then((result) => {
      res.status(200).json(result);
    })
    //Nếu có lỗi của server thì gửi phản hồi status 500 cùng với error
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Controller lấy toàn bộ để hiển thị ở admin list order
exports.getAll = (req, res, next) => {
  Order.find()
    .sort({ placedAt: -1 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};

//Controller để lấy số order và tính doanh thu theo tháng hiện tại (chỉ tính trong 1 tháng hiện tại không tính tổng)
exports.getRevandOrder = (req, res) => {
  Order.find()
    .then((result) => {
      //Lấy tháng hiển tại, và tính doanh thu của toàn bộ order trong tháng
      const numOfOrder = result.length;
      const curMonth = new Date().getMonth();
      const totalRevPerMonth = result.reduce((total, order) => {
        if (order?.placedAt.getMonth() === curMonth) {
          return total + +order.totalPrice;
        } else return total;
      }, 0);
      //Trả về doanh thu tháng và toàn bộ số lượng order
      res
        .status(200)
        .json({ numOfOrder: numOfOrder, totalRevPerMonth: totalRevPerMonth });
    })
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
