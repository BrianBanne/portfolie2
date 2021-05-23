const express = require("express");
const route = express.Router();

module.exports = (app) => {
  app.use("/user", route);

  route.use(validateUser);
  route.put("/update", async (req, res) => {
    const customerDetails = req.body;

    try {
      const user = await getUserFromToken(req.headers.authorization);
      if (!user)
        res.status(500).json({ error: "Unable to get user from token" });

      user.firstName = customerDetails.firstName;
      user.lastName = customerDetails.lastName;
      user.address = customerDetails.address;
      user.postcode = customerDetails.postcode;
      user.city = customerDetails.city;
      await user.save();
      return res
        .status(200)
        .json({ message: "Details are updated", user: user });
    } catch (error) {
      res.status(500).json({ error: "Unable to update details" });
    }
  });

  route.get("/details", async (req, res) => {
    const authHeader = req.headers.authorization;
    try {
      const user = await getUserFromToken(authHeader);
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.status(200).json({
        userDetails: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
          postcode: user.postcode,
          city: user.city,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  });
};
