const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema của chatRoom
const chatSchema = new Schema(
  {
    roomId: { type: String, required: true },
    clientId: { type: String, ref: "User" }, //Id của user người nhắn cho admin ref User để lấy thêm thông tin cần thiết để display UI
    message: {
      type: [
        {
          sender: { type: String }, //Người gửi là client (gửi từ trang client), 2 là admin-counseler(gửi từ trangadmin) (Không liên quan đến role trong User schema)
          text: { type: String },
        },
      ],
    },
    status: {
      type: String,
      default: "open", //Chuyển thành close khi người dùng "/end" trong room chat
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatMessage", chatSchema);
