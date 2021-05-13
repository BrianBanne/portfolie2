const express = require("express");
const OrderController = require('../controllers/order-controller')
const {validateUser} = require('../middleware/auth-middleware')

const UserRouter = express.Router();
UserRouter.use(validateUser)

UserRouter.get("/orders", OrderController.getUserOrders)

module.exports = UserRouter
