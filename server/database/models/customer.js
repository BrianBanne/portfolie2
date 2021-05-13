const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");

// discriminator makes the customer model inherit from the user model

const Customer = User.discriminator(
  "Customer",
  new Schema({
    address: { type: String, required: false },
    postcode: { type: String, required: false },
    city: { type: String, required: false },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  })
);

module.exports = Customer;
