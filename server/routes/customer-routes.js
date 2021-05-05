const express = require("express");

const customerRoutes = express.Router();

customerRoutes.post("/login/customer", async (req, res) => {
  const { token } = req.body;
  
});
