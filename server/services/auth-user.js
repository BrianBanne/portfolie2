const { google } = require("googleapis");
const path = require("path");
const Customer = require("../models/customer");
const config = require("../config");

const oauth2Client = new google.auth.OAuth2(
  config.google.clientId,
  config.google.secret,
  config.google.redirectUrl
);

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

/**
 * Returns an auth link that redirects to the google oauth login site
 *
 * @param {*} req
 * @param {*} res
 * @returns {url}
 */
function getRedirectUrl(req, res) {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("url", url);
  return res.status(200).json({ url: url });
}

async function getToken(req, res) {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const userinfo = await oauth2Client.getTokenInfo(tokens.access_token);
    const email = userinfo.email;
    // console.log(userInfo);

    if (!email)
      return res
        .status(400)
        .json({ error: "Unable to obtain email from login" });

    const user = await getUserFromEmail(email);
    console.log(user);

    return res.redirect(
      `https://localhost:4000/login/?token=${tokens.access_token}&email=${user.email}&userId=${user.id}`
    );
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Unable to process google callback, please try again" });
  }
}

async function getUserFromEmail(email) {
  console.log(email);
  const userExists = await Customer.findOne({ email: email });
  console.log(userExists);
  if (userExists) return { email: userExists.email, id: userExists.id };

  const newUser = new Customer({ email: email });
  await newUser.save();
  console.log(newUser);
  console.log("new user");
  return { email: newUser.email, id: newUser.id };
}

async function getUserFromToken(authHeader) {
  const token = authHeader.split(" ")[1];
  console.log("token", token);
  if (!token) throw new Error("Authorization header missing");

  try {
    const { email } = await client.getTokenInfo(token);
    console.log("email ", email);
    if (!email) throw new Error("Authorization failed, invalid token");

    return await Customer.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
}

async function getTokenInfo(access_token) {
  return await oauth2Client.getTokenInfo(access_token);
}

module.exports = { getRedirectUrl, getToken, getUserFromToken, getTokenInfo };
