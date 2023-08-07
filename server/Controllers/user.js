const User = require("../Models/User");

exports.userAcessClient = (req, res, next) => {
  const mode = req.query.mode;
  if (mode === "signup") {
    User.create({
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.name,
      phoneNumber: req.body.phone,
      isAdmin: false,
    })
      .then((result) => {
        res.status(201).json({ message: "User has created successfully!" });
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (mode === "login") {
    User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
      .then((result) => {
        if (result) {
          req.session.email = result.email;
          req.session.isLoggedIn = true;
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
  }
};

exports.checkLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    User.findOne({ email: req.session.email })
      .then((user) => {
        res.status(200).json({
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phoneNumber,
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
  User.findOne({ email: req.session.email })
    .populate("cart.productId")
    .then((user) => {
      if (user) {
        res.status(200).json(user.cart);
      }
    });
};

exports.updateCart = (req, res, next) => {
  User.findOne({ email: req.session.email }).then((user) => {
    const itemUpdate = user.updateCart(req.body.action, req.body.productId);
    res.status(200).json(itemUpdate);
  });
};

exports.deleteCartItem = (req, res, next) => {
  User.findOne({ email: req.session.email }).then((user) => {
    const cartUpdate = user.deleteCartItem(req.body.productId);
    res.status(200).json({ message: "Delete successfully!" });
  });
};
