const { OAuth2Client } = require("google-auth-library");
const Customer = require("../database/models/customer");
const jwt = require("jsonwebtoken");

require('dotenv').config()

//const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

async function isAuth(req, res, next) {
/*   const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1]
  console.log(token);
  console.log('secret',  process.env.GOOGLE_AUTH_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.GOOGLE_AUTH_SECRET);
    console.log(decoded);

  } catch(err) {
    console.log(err);
  } */
  //const decoded = jwt.decode(token, process.env.GOOGLE_AUTH_SECRET);
  next();
  /* const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.RLpGkNm2obN95ekSJTOW08Lv,
  }); */

  // const { given_name, family_name, email } = ticket.getPayload();

  // console.log(email);

  //const user = await Customer.findOne({ email: email });
}

module.exports = isAuth;
