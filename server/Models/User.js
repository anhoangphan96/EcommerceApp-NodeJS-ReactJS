const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  cart: [
    {
      productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});
userSchema.methods.addToCart = function (newCart) {
  const cartIndex = this.cart.findIndex(
    (cartItem) => cartItem.productId.toString() === newCart.productId
  );
  if (cartIndex === -1) {
    this.cart.push(newCart);
    this.save();
  } else {
    const updatedCart = [...this.cart];
    updatedCart[cartIndex].quantity += newCart.quantity;
    this.cart = updatedCart;
    this.save();
  }
};
userSchema.methods.updateCart = function (action, productId) {
  const cartIndex = this.cart.findIndex(
    (cartItem) => cartItem.productId.toString() === productId
  );
  const updatedCart = [...this.cart];
  updatedCart[cartIndex].quantity += action === "increase" ? 1 : -1;
  this.cart = updatedCart;
  this.save();
  return this.cart[cartIndex];
};

userSchema.methods.deleteCartItem = function (productId) {
  const cartIndex = this.cart.findIndex(
    (cartItem) => cartItem.productId.toString() === productId
  );
  const updatedCart = [...this.cart];
  updatedCart.splice(cartIndex, 1);
  this.cart = updatedCart;
  this.save();
  return this.cart;
};

module.exports = mongoose.model("User", userSchema);
