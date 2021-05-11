const express = require("express");
const ShopController = require("../controllers/shop-controller");
const OrderController = require("../controllers/order-controller");

const Router = express.Router();

// USER ROUTES

//  PRODUCT ROUTES
Router.get("/products", ShopController.getAllProducts);
Router.get("/product/:id", ShopController.getProduct);

// ORDER ROUTES
Router.post("/order/create", OrderController.createOrder);
Router.get("/order/:id", OrderController.getOrder);

module.exports = Router;
