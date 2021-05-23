const express = require("express");
const { validateAdmin, validateUser } = require("../middleware/auth-middleware");
const { getTokenInfo } = require("../../services/auth-user")
const Customer = require("../../models/customer");
const Order = require("../../models/order");
const Product = require("../../models/product");
const { sendError } = require("../../lib");

const route = express.Router();

module.exports = (app) => {
  app.use(route);
  route.post("/order/create", async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.description = 'Creates a new order from checkout'

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'Order details',
              required: true,
              schema: { $ref: "#/definitions/Order" }
      } */

    //if customer has not created account customerId is left blank
    const order = req.body;
    const { shippingDetails, cart, user } = order;
    const cartItems = [];
    let calculatedTotal = 0;

    for (const cartItem of cart) {
      const product = await Product.findOne({ _id: cartItem._id });
      calculatedTotal = calculatedTotal + cartItem.quantity * product.price;
    }

    try {
      const newOrder = new Order({
        orderStatus: "pending payment",
        total: calculatedTotal,
        products: cartItems,
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        address: shippingDetails.address,
        postcode: shippingDetails.postcode,
        city: shippingDetails.city,
      });

      if (user) {
        const existingCustomer = await Customer.findOne({
          email: user.email,
        });
        if (existingCustomer) newOrder.customer = existingCustomer.id;
      }
      console.log(newOrder);
      const result = await newOrder.save();
      return res
        .status(201)
        .json({ message: "order succesfully placed!", order: result._doc });
    } catch (error) {
      console.log(error);
      return sendError(
        res,
        500,
        "Something bad happened trying to place the order"
      );
    }
  });

  route.get("/orders", validateAdmin,  async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.description = 'Get all orders'
    try {
      const orders = await Order.find();
      console.log(orders);
      return res.status(200).json({ orders: orders });
    } catch (error) {
      console.log(error);
      sendError(res, 500, "Unable to retrieve orders");
    }
  });

  route.get("/order/:id", validateAdmin,  async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.description = 'Get order from id'
    const orderId = req.params.id;
    try {
      const order = await Order.findById(orderId);
      console.log(order);
      return res.status(200).json({ order: order });
    } catch (error) {
      console.log(error);
      sendError(res, 500, "Unable to retrieve order");
    }
  });

  route.get("/orders/user", validateUser , async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.description = 'Get a users orders'

    //todo: this is handled in middleware, maybe get userid from mw header?
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];
    console.log("token", token);
    try {
      const { email } = await getTokenInfo(token);
      const { id: userId } = await Customer.findOne({ email: email });
      const userOrders = await Order.find({ customer: userId });
      console.log("userorders", userOrders);
      return res.status(200).json({ orders: userOrders });
    } catch (error) {
      console.log(error);
    }
  });

  route.put("/order/:id", validateAdmin, async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.description = 'Update order from admin'

    //Restrictions: not allowed to change products in placed order, only details
    const orderData = req.body;

    try {
      const order = await Order.findById(orderId);

      // order.total = orderData.total;
      //order.products = orderData;
      order.orderStatus = orderDatao.orderStatus;
      order.firstName = orderData.firstName;
      order.lastName = orderData.lastName;
      order.address = orderData.address;
      order.postcode = orderData.postcode;
      order.city = orderData.city;

      await order.save();
      return res
        .status(200)
        .json({ message: "order succesfully updated!", order: result._doc });
    } catch (error) {
      console.log(error);
      return sendError(
        res,
        500,
        "Something bad happened trying to place the order"
      );
    }
  });
  route.delete("/order/:id", validateAdmin, async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.description = 'Delete a order'
    const orderId = req.params.id;
    try {
      const deletedOrder = await Product.deleteOne({ _id: orderId });
      console.log(deletedOrder);
      return res.status(200).json({
        message: "Order succesfully deleted",
      });
    } catch (error) {
      return sendError(res, 500, "Could not find a order from given id");
    }
  });
};
