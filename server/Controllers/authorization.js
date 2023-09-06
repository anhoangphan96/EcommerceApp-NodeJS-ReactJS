//Check author của client thì chỉ cần có role và đã đăng nhập là được truy cập (admin và counselor cũng được sử dụng tính năng ở clientapp)
exports.clientRoleAuthor = (req, res, next) => {
  if (
    req.session.isLoggedIn &&
    ["client", "counselor", "admin"].includes(req.session.role)
  ) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized!" });
  }
};
//Check author của counselor thì phải là admin hoặc counseler và đã đăng nhập là được truy cập
exports.counselorRoleAuthor = (req, res, next) => {
  if (
    req.session.isLoggedIn &&
    ["counselor", "admin"].includes(req.session.role)
  ) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized!" });
  }
};
//Check author của admin thì phải là admin  và đã đăng nhập là được truy cập
exports.adminRoleAuthor = (req, res, next) => {
  if (req.session.isLoggedIn && req.session.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized!" });
  }
};
