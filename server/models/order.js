const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  orderStatus: { type: String },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  postcode: { type: String, required: true },
  city: { type: String, required: true },
  total: { type: Number, required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],

  //todo: add orders reference
});
const Order =  mongoose.model("Order", orderSchema);
module.exports = Order
