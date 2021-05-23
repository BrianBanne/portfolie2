const bcrypt = require("bcrypt");
const Customer = require("../models/customer");
const config = require()

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(config);

//todo add auth

a/* sync function createCustomer(req, res) {
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
} */
/* 
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
} */

/* async function getCustomerById(id) {
  try {
    const user = await Customer.findById(id);
    return res.status(200).json({ user: user._doc });
  } catch (err) {
    throw err;
  }
} */





