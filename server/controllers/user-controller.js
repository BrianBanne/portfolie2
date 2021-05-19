const bcrypt = require("bcrypt");
const Customer = require("../database/models/customer");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
//todo add auth
require("dotenv").config();

async function createCustomer(req, res) {
  //const userInput = req.body.userInput;
  const userData = {
    email: "per@email.com",
    password: "heiehi123",
    firstName: "Per",
    lastName: "Spelleman",
  };

  try {
    const existingUser = await Customer.findOne({
      email: userData.email,
    });
    if (existingUser)
      throw new Error("A user with provided email already exists");
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const newUser = new Customer({
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
    const savedUser = await newUser.save();
    return res.status(201).json({ user: savedUser._doc });
  } catch (err) {
    return res.status(400).json({ message: "unable to create user", ...err });
  }
}

async function getCustomers(req, res) {
  try {
    const users = await Customer.find();
    const mappedUsers = users.map((user) => {
      return { ...user._doc };
    });
    return res.status(200).json({ users: mappedUsers });
  } catch (err) {
    throw err;
  }
}

/* async function getCustomerById(id) {
  try {
    const user = await Customer.findById(id);
    return res.status(200).json({ user: user._doc });
  } catch (err) {
    throw err;
  }
} */

async function updateCustomerDetails(req, res) {
  const customerDetails = req.body;

  try {
    const user = await getUserFromToken(req.headers.authorization);
    if (!user) res.status(500).json({ error: "Unable to get user from token" });

    user.firstName = customerDetails.firstName;
    user.lastName = customerDetails.lastName;
    user.address = customerDetails.address;
    user.postcode = customerDetails.postcode;
    user.city = customerDetails.city;
    await user.save();
    return res.status(200).json({ message: "Details are updated", user: user });
  } catch (error) {
    res.status(500).json({ error: "Unable to update details" });
  }
}

async function getCustomerDetails(req, res) {
  const authHeader = req.headers.authorization;
  try {
    const user = await getUserFromToken(authHeader);
    if (!user) res.status(404).json({ error: "User not found" });
    return;
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
}

async function handleGoogleLogin(req, res) {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_AUTH_SECRET,
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

async function getUserFromToken(authHeader) {
  const token = authHeader.split(" ")[1];
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

module.exports = {
  getCustomers,
  createCustomer,
  handleGoogleLogin,
  getCustomerDetails,
  updateCustomerDetails,
};
