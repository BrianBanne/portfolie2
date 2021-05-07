const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const { createCustomer, getCustomers, handleGoogleLogin } = require("./controllers/user-controller");
const isAuth = require('./middleware/auth-middleware')

const DB_HOST = "simplelinuxvm-tfh4puu22joq4.norwayeast.cloudapp.azure.com";
const URL = `mongodb://adminHans:Tvgj3789@${DB_HOST}:27017/ecomm`;
const url = `mongodb://localhost:27017/ecomm`;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const PORT = 8080;
const ADDRESS = "0.0.0.0";
const server = express()


server.use(express.json())
server.use(cors())
server.use(isAuth)

server.get("/", (req, res) => {
  res.send("This is the backend :)");
});
server.get("/addUser", createCustomer);
server.get("/api/customers", getCustomers);
server.post("/api/customer/login/google", handleGoogleLogin)

server.listen(PORT, ADDRESS, () =>
  console.log(`Server listening at port ${PORT}`)
);
