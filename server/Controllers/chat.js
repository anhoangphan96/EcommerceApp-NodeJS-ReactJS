const ChatMessage = require("../Models/ChatMessages");
exports.getListRooms = (req, res) => {
  ChatMessage.find({ status: "open" })
    .populate("clientId", "email")
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
exports.getListMessages = (req, res) => {
  const clientId = req.params.id;
  ChatMessage.findOne({ status: "open", clientId: clientId })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(204).json({ message: "Can not find any Room" });
      }
    })
    .catch((err) => console.log(err));
};
