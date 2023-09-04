const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Order schema gồm các field sau
const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        productId: {
          type: mongoose.SchemaTypes.ObjectId,
          required: true,
          ref: "Product",
        },
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
