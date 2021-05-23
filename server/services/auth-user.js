const path = require("path");
const Customer = require("../models/customer");
const config = require("../config");
const oauth2Client = require("../loaders/google-oauth");

/**
 * Returns an auth link that redirects to the google oauth login site
 *
 * @param {*} req
 * @param {*} res
 * @returns {url}
 */

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

async function getGoogleToken(code) {
  const token = authHeader.split(" ")[1];
  console.log("token", token);
  if (!token) throw new Error("Authorization header missing");

  try {
    const { email } = await oauth2Client.getTokenInfo(token);
    console.log("email ", email);
    if (!email) throw new Error("Authorization failed, invalid token");

    return await Customer.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
}

async function getTokenFromCode(code) {
  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  const userinfo = await oauth2Client.getTokenInfo(tokens.access_token);
  const email = userinfo.email;
  // console.log(userInfo);

  if (!email) throw Error("Unable to obtain email from google login");

  const user = await getUserFromEmail(email);
  return { user, tokens };
}

async function getTokenInfo(access_token) {
  return await oauth2Client.getTokenInfo(access_token);
}

module.exports = { getTokenFromCode, getTokenInfo };
