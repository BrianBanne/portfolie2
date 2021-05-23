const path = require("path");
const Customer = require("../models/customer");
const config = require("../config");
const oauth2Client = require("../loaders/google-oauth");

async function userSignup(email) {
  const newUser = new Customer({ email: email });
  await newUser.save();
  return newUser;
}

/**
 * Returns a customer object from google token
 *
 * @param {token} 
 * @returns {Customer}
 */

async function getGoogleToken(token) {
  try {
    if (!token) throw new Error("Authorization header missing");

    const { email } = await oauth2Client.getTokenInfo(token);
    if (!email) throw new Error("Authorization failed, invalid token");

    return await Customer.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
}

async function getUserFromEmail(email) {
  try {
    const user = await Customer.findOne({ email: email });
    if (user) return user;
    else {
      return await userSignup(email);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTokensFromCode(code) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const { email } = await oauth2Client.getTokenInfo(tokens.access_token);
    if (!email) throw Error("Unable to obtain email from google login");

    const user = await getUserFromEmail(email);
    return { tokens, user };
  } catch (err) {
    console.log(err);
  }
}
async function getTokenInfo(access_token) {
  return await oauth2Client.getTokenInfo(access_token);
}

module.exports = { getTokenInfo, getTokensFromCode, getGoogleToken };
