const { Router } = require("express");

const auth = require("./routes/auth");
const orders = require("./routes/order");
const products = require("./routes/product");
const user = require("./routes/user");

module.exports = () => {
  const app = Router();
  auth(app);
  orders(app);
  products(app);
  user(app);

  return app;
};
