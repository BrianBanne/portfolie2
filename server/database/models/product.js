const mongoose = require("mongoose");

const adr = "https://lh3.googleusercontent.com/proxy/R-iUnTB92tpxfSn4nWSqlEr50zD1Y5y6p0sZSBoWVxVISOrZk-bhfbhryhLWssNCEPd55Xlekq7PwPEn0A67r4ApickzxSHnt9LIg56A0-ZkdqX0j2jVxs8ogamw"

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  shortDescription: { type: String },
  imageUrl: { type: String, default: adr },
  stockQuantity: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product
