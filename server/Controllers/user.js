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
        console.log(result);
        if (result) {
          req.session.username = result.username;
          req.session.isLoggedIn = true;
          res.status(200).json(result);
        } else {
          res
            .status(401)
            .json({ message: "Your username or password is incorrect" });
        }
      })
      .catch((err) => console.log(err));
  }
};
