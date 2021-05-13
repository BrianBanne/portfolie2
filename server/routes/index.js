const express = require("express");

const ShopController = require("../controllers/shop-controller");
const OrderController = require("../controllers/order-controller");
const loginAdmin = require("../auth/admin");

const {
  validateAdmin,
  validateUser,
} = require("../middleware/auth-middleware");

const { getRedirectUrl, getToken } = require("../auth/google");

// ADMIN ROUTES
const AdminRouter = express.Router();
//Adds middleware to authorize admin
AdminRouter.use(validateAdmin);
AdminRouter.post("/product", ShopController.createProduct);
AdminRouter.put("/product/:id", ShopController.updateProduct);
AdminRouter.delete("/product/:id", ShopController.deleteProduct);

AdminRouter.get("/orders", OrderController.getAllOrders);
AdminRouter.put("/order/:id", OrderController.updateOrder);
AdminRouter.delete("/order/:id", OrderController.deleteOrder);

AdminRouter.get("/order/:id", OrderController.getOrder);

//AUTH ROUTES
const AuthRouter = express.Router();
AuthRouter.get("/login/google", getRedirectUrl);
AuthRouter.get("/login/google/callback", getToken);
AuthRouter.post("/login/admin", loginAdmin);

// USER ROUTES
const UserRouter = express.Router();
//Adds middleware to authorize user
UserRouter.use(validateUser);
UserRouter.get("/orders", OrderController.getUserOrders);

//  PULIC / PRODUCT ROUTES
const Public = express.Router();
Public.get("/products", ShopController.getAllProducts);
Public.get("/product/:id", ShopController.getProduct);

// ORDER ROUTES
Public.post("/order/create", OrderController.createOrder);

module.exports = { Public, AdminRouter, AuthRouter, UserRouter };
