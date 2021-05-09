const express = require("express");

const userRoutes = express.Router();

userRoutes.post("/login/user", async (req, res) => {
  const { token } = req.body;
});

userRoutes.post("/login/admin", async (req, res) => {
  const { token } = req.body;
});
