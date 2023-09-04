const ChatMessage = require("../Models/ChatMessages");

//Controller để fetch listroom cho admin page
exports.getListRooms = (req, res) => {
  //Chỉ trả về các room có status open populate data email của clientId để hiển thị, nếu thành công thì trả về listroom lỗi thì trả về status 500
  ChatMessage.find({ status: "open" })
    .populate("clientId", "email")
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      const error = new Error(err);
      res.status(500).json(error);
    });
};

//Controller để fetch list message khi admin nhấn vào bất kỳ room nào
exports.getListMessages = (req, res) => {
  const clientId = req.params.id;
  //Tìm message bằng clientId và status room đang mở (mỗi client chỉ có duy nhất 1 room với status open, khi họ kết thúc phiên chat bằng "/end" thì sẽ chuyển status thành close)
  ChatMessage.findOne({ status: "open", clientId: clientId })
    .then((result) => {
      //Nếu có room phù hợp thì trả về room còn không thì thông báo user này chưa có room
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(204).json({ message: "Can not find any Room" });
      }
    })
    .catch((err) => console.log(err));
};
