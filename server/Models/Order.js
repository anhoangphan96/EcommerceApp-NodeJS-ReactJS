const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    email: { type: String, ref: "User", required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        productId: { type: mongoose.SchemaTypes.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: String, required: true },
    status: {
      type: String,
      required: true,
    },
    placedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
