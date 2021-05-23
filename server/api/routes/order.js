const express = require("express");
const {
  validateAdmin,
  validateUser,
} = require("../middleware/auth-middleware");
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

    const order = req.body;
    const { shippingDetails, cart, user } = order;
    console.log("cart", cart);

    const cartItems = [];
    let calculatedTotal = 0;

    for (const item of cart) {
      const product = await Product.findById(item._id);
      calculatedTotal = calculatedTotal + item.quantity * product.price;
      cartItems.push({ product: product._id, quantity: item.quantity });
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

      //if customer has not created account customerId is left blank
      if (user) {
        const existingCustomer = await Customer.findOne({
          email: user.email,
        });
        if (existingCustomer) newOrder.customer = existingCustomer.id;
      }
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

  route.get("/orders", validateAdmin, async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.description = 'Get all orders'
    try {
      const orders = await Order.find();
      return res.status(200).json({ orders: orders });
    } catch (error) {
      console.log(error);
      sendError(res, 500, "Unable to retrieve orders");
    }
  });

  route.get("/order/:id", validateAdmin, async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.description = 'Returns an order object from given id'
    const orderId = req.params.id;
    try {
      const order = await Order.findById(orderId);
      return res.status(200).json({ order: order });
    } catch (error) {
      console.log(error);
      sendError(res, 500, "Unable to retrieve order");
    }
  });

  route.get("/orders/user", validateUser, async (req, res) => {
    // #swagger.tags = ['Order']
    // #swagger.description = 'Get a users orders'

    try {
      const existingUser = await Customer.findById(req.user._id);
      if (!existingUser)
        return res.status(404).json({ error: "Could not find user" });

      const userOrders = await Order.find({ customer: existingUser.id });
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
    const orderId = req.params.id;

    try {
      const order = await Order.findById(orderId);

      order.orderStatus = orderData.orderStatus;
      order.firstName = orderData.firstName;
      order.lastName = orderData.lastName;
      order.address = orderData.address;
      order.postcode = orderData.postcode;
      order.city = orderData.city;

      const updatedOrder = await order.save();
      return res
        .status(200)
        .json({ message: "order succesfully updated!", order: updatedOrder });
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
      return res.status(200).json({
        message: "Order succesfully deleted",
      });
    } catch (error) {
      return sendError(res, 500, "Could not find a order from given id");
    }
  });
};
