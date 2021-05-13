const Order = require("../database/models/order");
const Product = require("../database/models/product");
const { sendError } = require("../lib");

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    return res.status(200).json({ products: products });
  } catch (error) {
    return sendError(res, 500, error);
  }
}

async function getProduct(req, res) {
  const productId = req.params.id;
  if (!productId)
    return sendError(res, 400, "Product id not defined in request");
  try {
    const product = await Product.findById(productId);
    return res.status(200).json({ product: product });
  } catch (error) {
    return sendError(res, 500, "Could not get product with given id");
  }
}

async function createProduct(req, res) {
  //auth
  const product = req.body;

  try {
    const productExists = await Product.findOne({ name: product.name });
    if (productExists)
      return sendError(res, 400, "A product with this name already exists");

    const newProduct = new Product({
      name: product.name,
      price: product.price,
      descrption: product.descrption,
      shortDescription: product.shortDescription,
      imageUrl: product.imageUrl,
      stockQuantity: product.quantity,
    });

    const result = await newProduct.save();
    return res
      .status(201)
      .json({ product: result._doc, message: "Product successfully created" });
  } catch (error) {
    return sendError(res, 500, error);
  }
}

async function updateProduct(req, res) {
  //auth
  const productId = req.params.id;
  const updatedValues = req.body;
  if (!productId)
    return sendError(res, 400, "Product id not defined in request");
  try {
    const product = await Product.findById(productId);
    product.name = updatedValues.name;
    product.price = updatedValues.price;
    product.descrption = updatedValues.descrption;
    product.shortDescription = updatedValues.shortDescription;
    product.imageUrl = updatedValues.imageUrl;
    product.stockQuantity = updatedValues.quantity;

    await product.save();
    return res.status(200).json({ message: "Product successfully updated" });
  } catch (error) {
    return sendError(res, 500, "Could not get product with given id");
  }
}

async function deleteProduct(req, res) {
  //auth
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.deleteOne({ _id: productId });
    return res.status(200).json({
      message: "Product succesfully deleted",
      //product: deletedProduct,
    });
  } catch (error) {
    return sendError(res, 500, "Could not find a product from given id");
  }
}

async function deleteAllProducts(req, res) {
  //auth
  try {
    const deletedProducts = await Product.remove({});
    console.log(deletedProducts);
    return res.status(200).json({
      message: "Products succesfully deleted",
    });
  } catch (error) {
    return sendError(res, 500, "Unable to delete products");
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  createProduct,
};
