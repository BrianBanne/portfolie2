const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  orderStatus: { type: String },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  shippingAddress: { type: String, required: true },
  shippingMethod: { type: String },
  total: { type: Number, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

  //todo: add orders reference
});

module.exports = mongoose.model("Order", orderSchema);
