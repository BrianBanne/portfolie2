const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  userType: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  address: { type: String, required: false },
  postcode: { type: String, required: false },
  city: { type: String, required: false },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
