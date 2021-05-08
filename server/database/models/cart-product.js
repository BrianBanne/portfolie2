const mongoose = require("mongoose");

const cartItem = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("CartItem", cartItem);
