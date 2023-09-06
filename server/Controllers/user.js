const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

//Controller user client signup
exports.userSignup = (req, res, next) => {
  //Validate check xem có lỗi về input không, cũng như check luôn phần có bị trùng email đã đăng ký rồi không
  const errors = validationResult(req);
  //Nếu có error thì sẽ trả các phản hồi lỗi tương ứng tới frontend
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
    //Nếu không có lỗi về validate thì so  sẽ tạo user mới với password được encrypt bằng bcrypt
    bcrypt
      .hash(req.body.password, 12)
      .then((enpassword) => {
        return User.create({
          email: req.body.email,
          password: enpassword,
          fullName: req.body.name,
          phoneNumber: req.body.phone,
          isAdmin: false,
        });
      })
      //Trả về status và message thành công
      .then((result) => {
        res.status(201).json({ message: "User has created successfully!" });
      })
      //Lỗi server status 500
      .catch((err) => {
        const error = new Error(err);
        res.status(500).json(error);
      });
  }
};

//Controller user client login
exports.userLogin = (req, res, next) => {
  //Validate check xem có lỗi về input không
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
    //Nếu không có lỗi về input thì sẽ kiểm tra người dùng
    User.findOne({
      email: req.body.email,
    })
      .then((result) => {
        //Nếu nhập đúng password và email thì sẽ lưu thông tin session và trả thông tin người dùng cho frontend
        bcrypt
          .compare(req.body.password, result.password)
          .then((matchpassword) => {
            if (matchpassword) {
              req.session.email = result.email;
              req.session.isLoggedIn = true;
              req.session.role = result.role;
              return req.session.save();
            } else {
              //Nếu nhập sai data thì trả về status 401 và lỗi email hoặc password sai
              res
                .status(401)
                .json({ message: "Your email or password is incorrect" });
            }
          })
          //Nếu có các lỗi thì trả về status 500 cùng lỗi hệ thống
          .then(() => {
            res.status(200).json(result);
          })
          .catch((err) => {
            const error = new Error(err);
            res.status(500).json(error);
          });
      })
      .catch((err) => {
        const error = new Error(err);
        res.status(500).json(error);
      });
  }
};

//Controller để check xem user khi quay lại hoặc f5 page thì đã đăng nhập chưa bằng cách kiểm tra isLoggedIn lưu trong session
exports.checkLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    //Nếu user đăng nhập rồi thì trả về data cho user để lưu vào redux store hiển thị UI
    User.findOne({ email: req.session.email })
      .then((user) => {
        res.status(200).json({
          _id: user._id,
          email: user.email,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          role: user.role,
        });
      })
      //Nếu có các lỗi thì trả về status 500 cùng lỗi hệ thống
      .catch((err) => {
        const error = new Error(err);
        res.status(500).json(error);
      });
    //Còn nếu chưa đăng nhập thì không phản hồi bất cứ thông tin gì
  } else {
    res.status(401).json({ message: "User has not logged in!" });
  }
};

//Controller để thêm 1 sản phẩm vào giỏ hàng của user
exports.postAddCart = async (req, res, next) => {
  try {
    //Lấy thông tin cart item từ req.body rồi tìm user và gọi method addToCart để update vào DB
    const cartData = req.body;
    const user = await User.findOne({ email: req.session.email });
    if (user) {
      await user.addToCart(cartData);
      res.status(200).json({ message: "Add to cart successfully!" });
    }
  } catch (err) {
    const error = new Error(err);
    res.status(500).json(error);
  }
};

//Controller để lấy danh sách list cart của user
exports.getListCart = (req, res, next) => {
  let haveItemCount0 = false;
  //User bắt buộc phải đăng nhập mới được sử dụng chức năng này nên ta có thể sử dụng email lưu trong session
  User.findOne({ email: req.session.email })
    .populate("cart.productId")
    .then((user) => {
      if (user) {
        //Kiêm tra trong giỏ hàng của user có item nào bị hết hàng không, nếu có sẽ xóa item đó và cập nhật giỏ hàng cho user
        for (let i = 0; i < user.cart.length; i++) {
          if (!user.cart[i].productId.count) {
            haveItemCount0 = true;
            break;
          }
        }
        if (haveItemCount0) {
          return user.deleteByCount0(user.cart);
        } else {
          return user.cart;
        }
      }
    })
    //Trả về phản hồi cho người dùng listcart và message, nếu có cập nhật giỏ hàng thì báo vừa cập nhật do có item hết hàng
    .then((result) => {
      res.status(200).json({
        cart: result,
        message: `${
          haveItemCount0
            ? "Some items are out of stock, your cart has been updated!"
            : ""
        }`,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Controller để cập nhật giỏ hàng của user
exports.updateCart = (req, res, next) => {
  //User bắt buộc phải đăng nhập mới được sử dụng chức năng này nên ta có thể sử dụng email lưu trong session
  User.findOne({ email: req.session.email })
    .then((user) => {
      //Gọi method updateCart (action là hành động tăng hoặc giảm, và productId)
      return user.updateCart(req.body.action, req.body.productId);
    })
    //Trả về cart mới update khi cập nhật thành công
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Controller để xóa 1 item trong giỏ hàng
exports.deleteCartItem = (req, res, next) => {
  //User bắt buộc phải đăng nhập mới được sử dụng chức năng này nên ta có thể sử dụng email lưu trong session
  User.findOne({ email: req.session.email })
    //Gọi method xóa dựa vào id để cập nhật giỏ hàng
    .then((user) => {
      return user.deleteCartItem(req.body.productId);
    })
    .then((result) => res.status(200).json({ message: "Delete successfully!" }))
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
//Controller handle logout của user client
exports.userLogout = (req, res) => {
  req.session.destroy((result) => {
    res.status(200).json({ message: "Log out succesfully" });
  });
};

//Controller adminlogin cũng giống với userLogin nhưng sẽ có check thêm phần role, chỉ có admin và counselor role mới được vào trang admin
exports.adminLogin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
    User.findOne({
      email: req.body.email,
    })
      .then((result) => {
        bcrypt
          .compare(req.body.password, result.password)
          .then((matchpassword) => {
            if (matchpassword) {
              if (["admin", "counselor"].includes(result.role)) {
                req.session.email = result.email;
                req.session.isLoggedIn = true;
                req.session.role = result.role;
                return req.session.save((err) => {
                  res.status(200).json(result);
                });
              } else {
                res.status(403).json({
                  message: "You dont have permission to access this page",
                });
              }
            } else {
              res
                .status(401)
                .json({ message: "Your username or password is incorrect" });
            }
          })
          .catch((err) => {
            const error = new Error(err);
            res.status(500).json(error);
          });
      })
      .catch((err) => {
        const error = new Error(err);
        res.status(500).json(error);
      });
  }
};
//Admin và counselor logout
exports.adminLogout = (req, res) => {
  req.session.destroy((result) => {
    res.status(200).json({ message: "Log out succesfully" });
  });
};

//Lấy số lượng client để display ở inforBoard
exports.numofclient = (req, res) => {
  //Tìm và đếm số user có role là client trả về cho frontend
  User.countDocuments({ role: "client" })
    .then((result) => res.status(200).json({ amount: result }))
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};

//Lấy list user
exports.getListUser = (req, res, next) => {
  //Tìm toàn bộ user để trả về hiển thị danh sách user cho frontend ở trang admin
  User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};

//Set role cho user
exports.setRole = (req, res) => {
  const userId = req.body.userId;
  const setToRole = req.body.setToRole;
  //Tìm user  bằng user id và set thành role như frontend truyền xuống
  User.findByIdAndUpdate(userId, { role: setToRole }, { new: true })
    .then((result) =>
      res.status(200).json({ message: `Set to ${result.role} succesfully!` })
    )
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};
