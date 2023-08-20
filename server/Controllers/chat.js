exports.sendMessage = (req, res, next) => {
  console.log(req.session.role);
  bodyData = req.body;
  console.log(bodyData);
  const io = require("../socket").getIO();
  io.emit("sendMessage", {
    senderId: bodyData.userId,
    message: bodyData.message,
  });
};
