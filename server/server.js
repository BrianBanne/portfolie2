const express = require("express");
const mongoose = require("mongoose");
const { createCustomer, getCustomers } = require("./database/controllers/user-controller");

const DB_HOST = "simplelinuxvm-tfh4puu22joq4.norwayeast.cloudapp.azure.com";
const URL = `mongodb://adminHans:Tvgj3789@${DB_HOST}:27017/ecomm`;
const url = `mongodb://localhost:27017/ecomm`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const server = express();
const PORT = 8080;
const ADDRESS = "0.0.0.0";

server.get("/", (req, res) => {
  res.send("This is the backend :)");
});

server.get("/addUser", createCustomer);
server.get("/getUsers", getCustomers);


server.listen(PORT, ADDRESS, () =>
  console.log("Server listening at port " + PORT)
);
