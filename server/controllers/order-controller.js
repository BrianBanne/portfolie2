const Order = require("../database/models/order");
const { sendError } = require("../lib");

async function createOrder(req, res) {
  //if customer has not created account customerId is left blank
  //const customerId = req.params.userId || "";
  const order = req.body;
  const cartItems = [];

  //todo: calc total from products

  order.cart.forEach((item) =>
    cartItems.push({
      product: item.productId,
      quantity: item.quantity,
    })
  );
  try {
    const newOrder = new Order({
      orderStatus: "pending payment",
      total: order.total,
      products: cartItems,
      firstName: order.firstName,
      lastName: order.lastName,
      address: order.address,
      postcode: order.postcode,
      city: order.city,
    });
    if (order.userId) newOrder.customer = order.userId;
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
}

async function updateOrder(req, res) {
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
}

async function getAllOrders(req, res) {
  //todo: auth

  try {
    const orders = await Order.find();
    console.log(orders);
    return res.status(200).json({ orders: orders });
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Unable to retrieve orders");
  }
}

async function getOrder(req, res) {
  //todo: auth
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    console.log(order);
    return res.status(200).json({ order: order });
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Unable to retrieve order");
  }
}

async function deleteOrder(req, res) {
  //todo: auth
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
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
