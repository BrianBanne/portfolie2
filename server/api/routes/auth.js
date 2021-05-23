const express = require("express");
const route = express.Router();
const config = require("../../config");
module.exports = (app) => {
  app.use("/user", route);

 /*  route.get("/login/google", getRedirectUrl);
  route.get("/login/google/callback", getToken);
  route.post("/login/admin", loginAdmin); */

  async function handleGoogleLogin(req, res) {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.google.secret,
    });

    const { given_name, family_name, email } = ticket.getPayload();

    const user = await Customer.findOne({ email: email });

    if (user) {
      req.headers.Authorization = user._id;
      return res.status(201).json({ user: user, token: ticket });
    }

    const newUser = new Customer({
      firstName: given_name,
      lastName: family_name,
      email: email,
    });
    req.headers.Authorization = newUser._id;

    return res.status(201).json({ user: newUser, token: ticket });
  }


};
