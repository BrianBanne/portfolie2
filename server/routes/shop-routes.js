const express = require("express");
const ShopController = require("../controllers/shop-controller");
const OrderController = require('../controllers/order-controller')

const Router = express.Router();

// USER ROUTES



//  PRODUCT ROUTES
Router.get("/products", ShopController.getAllProducts);
Router.get("/product/:id", ShopController.getProduct);
Router.put("/product/:id", ShopController.updateProduct);
Router.delete("/product/:id", ShopController.deleteProduct);
Router.post("/product", ShopController.createProduct);


// ORDER ROUTES
Router.post("/order/create", OrderController.createOrder)
Router.get("/orders", OrderController.getAllOrders)
Router.get("/order/:id", OrderController.getOrder)
Router.put("/order/:id", OrderController.updateOrder)
Router.delete("/order/:id", OrderController.deleteOrder)


module.exports = Router