const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    roomId: { type: String, ref: "User", required: true }, //Sử dụng id của user để làm roomId để tiện theo dõi đang chat với user nào

    message: {
      type: [
        {
          senderId: { type: String },
          sender: { type: String }, //Người gửi 1 là khách hàng (gửi từ trang client), 2 là admin-counseler(gửi từ trangadmin)
          text: { type: String },
        },
      ],
    },
    status: {
      type: String,
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatMessage", chatSchema);
