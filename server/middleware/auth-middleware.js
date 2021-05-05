const { OAuth2Client } = require("google-auth-library");
const Customer = require("../database/models/customer");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

async function isAuth(req, res, next) {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.RLpGkNm2obN95ekSJTOW08Lv,
  });

  const { given_name, family_name, email } = ticket.getPayload();

  console.log(email);

  const user = await Customer.findOne({ email: email });
}

module.exports = isAuth;
