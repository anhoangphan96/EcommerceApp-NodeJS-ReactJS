const ChatMessage = require("../Models/ChatMessages");
exports.getListRooms = (req, res) => {
  ChatMessage.find({ status: "open" })
    .populate("clientId", "email")
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
exports.getListMessages = (req, res) => {
  const roomId = req.params.id;
  ChatMessage.findOne({ status: "open", roomId: roomId })
    .then((result) => res.status(200).json(result.message))
    .catch((err) => console.log(err));
};
