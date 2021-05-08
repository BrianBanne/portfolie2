const express = require("express");
const ShopController = require("../controllers/shop-controller");
const OrderController = require('../controllers/order-controller')

const ShopRouter = express.Router();

ShopRouter.get("/products", ShopController.getAllProducts);
ShopRouter.get("/product/:id", ShopController.getProduct);
ShopRouter.put("/product/:id", ShopController.updateProduct);
ShopRouter.delete("/product/:id", ShopController.deleteProduct);
ShopRouter.post("/product", ShopController.createProduct);

ShopRouter.post("/:userId/order/create", OrderController.createOrder)

module.exports = ShopRouter