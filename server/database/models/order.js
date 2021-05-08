const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  orderStatus: { type: String },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: { type: String, required: true },
  postcode: { type: String, required: true },
  city: { type: String, required: true },
  total: { type: Number, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem"}],

  //todo: add orders reference
});

module.exports = mongoose.model("Order", orderSchema);
