const bcrypt = require("bcrypt");
const Customer = require("../database/models/customer");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
//todo add auth

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

async function getCustomerById(id) {
  try {
    const user = await Customer.findById(id);
    return res.status(200).json({ user: user._doc });
  } catch (err) {
    throw err;
  }
}

//todo send session header?? undefined

async function handleGoogleLogin(req, res) {
  console.log("hei");
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.RLpGkNm2obN95ekSJTOW08Lv,
  });

  const { given_name, family_name, email } = ticket.getPayload();

  console.log(email);

  const user = await Customer.findOne({ email: email });

  if (user) {
    console.log("new");
    console.log(user);
    req.headers.Authorization = user._id;
    return res.status(201).json({ user: user, token: ticket });
  }

  const newUser = new Customer({
    firstName: given_name,
    lastName: family_name,
    email: email,
  });
  console.log("old");
  console.log(newUser);
  req.headers.Authorization = newUser._id;

  return res.status(201).json({ user: newUser, token: ticket });
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  handleGoogleLogin,
};
