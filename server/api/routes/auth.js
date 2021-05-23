const express = require("express");
const route = express.Router();
const config = require("../../config");
const oauth2Client = require("../../loaders/google-oauth");
const User = require("../../models/user");
const { getTokensFromCode } = require("../../services/auth-user");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.use("/auth", route);

  route.get("/login/google", async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Returns a redirect url to google login'
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: config.google.scopes,
    });
    return res.status(200).json({ url: url });
  });

  route.get("/login/google/callback", async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Callback url from google oauth. Returns link with token in query'
    try {
      const code = req.query.code;
      const { user, tokens } = await getTokensFromCode(code);

      return res.redirect(
        `http://localhost:4000/login/?token=${tokens.access_token}&email=${user.email}&userId=${user.id}`
      );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Unable to process google callback, please try again" });
    }
  });

  route.post("/login/admin", async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Admin login verification, returns token'

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'Admin email and password',
              required: true,
              schema: {
                $email: 'admin@admin.com',
                $password: admin123,
    } */

    const userData = req.body;

    const user = await User.findOne({
      email: userData.email,
      userType: "ADMIN",
    });
    if (!user) return res.status(401).json({ error: "No admin found" });

    const isPasswordValid = user.password === userData.password;
    if (!isPasswordValid)
      return res.status(401).json({ error: "Password is not correct" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      user: { email: user.email, userType: user.userType },
      token: token,
    });
  });
};

/*

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
  */
