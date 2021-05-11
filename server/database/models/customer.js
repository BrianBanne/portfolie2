const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");

// discriminator makes the customer model inherit from the user model

const Customer = User.discriminator(
  "Customer",
  new Schema({
    address: { type: String, required: true },
    postcode: { type: String, required: true },
    city: { type: String, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  })
);

module.exports = Customer;
