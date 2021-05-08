async function createOrder(req, res) {
  //if customer has not created account customerId is left blank
  const customerId = req.params.id || "";
  const order = req.params.body;

 /*  cart.products.forEach(product => {      
  }); */

  //calc total from products
  try {
    const newOrder = new Order({
      orderStatus: "pending payment",
      customer: customerId,
      total: order.total,
      products: order.cart.products._id,
      address: order.address,
      postcode: order.postcode,
      city: order.city,
    });
  } catch (error) {}
}

async function updateOrder(req, res) {}

async function deleteOrder(req, res) {}

module.exports = { createOrder };
