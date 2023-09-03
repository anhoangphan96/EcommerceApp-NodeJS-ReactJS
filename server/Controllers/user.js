const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.userSignup = (req, res, next) => {
  const errors = validationResult(req);
  //Nếu có error thì sẽ trả các phản hồi lỗi tương ứng tới frontend
  if (!errors.isEmpty()) {
    res.status(400).json(errors.mapped());
  } else {
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
      .then((result) => {
        res.status(201).json({ message: "User has created successfully!" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
exports.userLogin = (req, res, next) => {
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
              req.session.email = result.email;
              req.session.isLoggedIn = true;
              req.session.role = result.role;
              return req.session.save((err) => {
                res.status(200).json(result);
              });
            } else {
              res
                .status(401)
                .json({ message: "Your username or password is incorrect" });
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
};
exports.checkLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    User.findOne({ email: req.session.email })
      .then((user) => {
        res.status(200).json({
          _id: user._id,
          email: user.email,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401).json({ message: "Unauthorized!" });
  }
};

exports.postAddCart = (req, res, next) => {
  const cartData = req.body;
  User.findOne({ email: req.session.email })
    .then((user) => {
      if (user) {
        return user.addToCart(cartData);
      }
    })
    .catch((err) => console.log(err));
};

exports.getListCart = (req, res, next) => {
  let haveItemCount0 = false;
  User.findOne({ email: req.session.email })
    .populate("cart.productId")
    .then((user) => {
      if (user) {
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
    .then((result) => {
      res.status(200).json({
        cart: result,
        message: `${
          haveItemCount0
            ? "Some items are out of stock, your cart has been updated!"
            : ""
        }`,
      });
    });
};

exports.updateCart = (req, res, next) => {
  User.findOne({ email: req.session.email })
    .then((user) => {
      return user.updateCart(req.body.action, req.body.productId);
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.deleteCartItem = (req, res, next) => {
  User.findOne({ email: req.session.email })
    .then((user) => {
      return user.deleteCartItem(req.body.productId);
    })
    .then((result) => res.status(200).json({ message: "Delete successfully!" }))
    .catch((err) => console.log(err));
};
exports.userLogout = (req, res) => {
  req.session.destroy((result) => {
    console.log(result);
    console.log(req.session);
    res.status(200).json({ message: "Log out succesfully" });
  });
};

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
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
};

exports.adminLogout = (req, res) => {
  req.session.destroy((result) => {
    res.status(200).json({ message: "Log out succesfully" });
  });
};

exports.numofclient = (req, res) => {
  User.countDocuments({ role: "client" })
    .then((result) => res.status(200).json({ amount: result }))
    .catch((err) => console.log(err));
};

//Lấy list user
exports.getListUser = (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

//Set role cho user
exports.setRole = (req, res) => {
  const userId = req.body.userId;
  const setToRole = req.body.setToRole;
  User.findByIdAndUpdate(userId, { role: setToRole }, { new: true })
    .then((result) =>
      res.status(200).json({ message: `Set to ${result.role} succesfully!` })
    )
    .catch((err) => console.log(err));
};
