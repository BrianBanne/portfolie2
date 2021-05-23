const express = require("express");
const { validateAdmin } = require("../middleware/auth-middleware");
const route = express.Router();

// ADMIN ROUTES
module.exports = (app) => {
  //Adds middleware to authorize admin
  app.use("admin/", route);
  route.use(validateAdmin);
};
