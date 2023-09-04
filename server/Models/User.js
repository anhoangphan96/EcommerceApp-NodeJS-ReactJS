const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//User schema
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
  role: {
    type: String,
    default: "client",
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
//Thêm các phương thức thao tác với giỏ hàng: thêm, cập nhật, xóa của user để sử dụng
userSchema.methods.addToCart = async function (newCart) {
  try {
    const cartIndex = this.cart.findIndex(
      (cartItem) => cartItem.productId.toString() === newCart.productId
    );
    if (cartIndex === -1) {
      this.cart.push(newCart);
      await this.save();
    } else {
      const updatedCart = [...this.cart];
      updatedCart[cartIndex].quantity += newCart.quantity;
      this.cart = updatedCart;
      await this.save();
    }
  } catch (err) {
    throw err;
  }
};
userSchema.methods.updateCart = async function (action, productId) {
  try {
    const cartIndex = this.cart.findIndex(
      (cartItem) => cartItem.productId.toString() === productId
    );
    const updatedCart = [...this.cart];
    updatedCart[cartIndex].quantity += action === "increase" ? 1 : -1;
    this.cart = updatedCart;
    await this.save();
    return this.cart[cartIndex];
  } catch (err) {
    throw err;
  }
};
//Xóa 1 item khi vào phần giỏ hàng
userSchema.methods.deleteCartItem = async function (productId) {
  try {
    const cartIndex = this.cart.findIndex(
      (cartItem) => cartItem.productId.toString() === productId
    );
    const updatedCart = [...this.cart];
    updatedCart.splice(cartIndex, 1);
    this.cart = updatedCart;
    await this.save();
    return this.cart;
  } catch (err) {
    throw err;
  }
};
//Xóa 1 item đang trong giỏ hàng nhưng khi count của item đó bằng 0
userSchema.methods.deleteByCount0 = async function (listcart) {
  try {
    const updatedCart = listcart.filter((cart) => cart.productId.count !== 0);
    this.cart = updatedCart.map((cart) => {
      return { productId: cart.productId._id, quantity: cart.quantity };
    });
    await this.save();
    return updatedCart;
  } catch (err) {
    throw err;
  }
};

//Xóa hết các item có trong cart khi người dùng đặt hàng thành công
userSchema.methods.clearCart = async function () {
  try {
    this.cart = [];
    await this.save();
    return this.cart;
  } catch (err) {
    throw err;
  }
};
module.exports = mongoose.model("User", userSchema);
