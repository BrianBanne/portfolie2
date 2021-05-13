const express = require("express");
const ShopController = require("../controllers/shop-controller");
const OrderController = require('../controllers/order-controller')
const { validateAdmin } = require("../middleware/auth-middleware");

const AdminRouter = express.Router();

//Adds middleware to authorize admin 
AdminRouter.use(validateAdmin)

AdminRouter.put("/product/:id", ShopController.updateProduct);
AdminRouter.delete("/product/:id", ShopController.deleteProduct);
AdminRouter.post("/product", ShopController.createProduct);
AdminRouter.put("/product/:id", ShopController.updateProduct);


AdminRouter.get("/orders", OrderController.getAllOrders)
AdminRouter.put("/order/:id", OrderController.updateOrder)
AdminRouter.delete("/order/:id", OrderController.deleteOrder)


module.exports = AdminRouter