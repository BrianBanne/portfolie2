const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const { createCustomer, getCustomers, handleGoogleLogin } = require("./controllers/user-controller");
const isAuth = require('./middleware/auth-middleware');
const Router = require("./routes/shop-routes");

//const DB_HOST = "simplelinuxvm-tfh4puu22joq4.norwayeast.cloudapp.azure.com";
//const URL = `mongodb://adminHans:Tvgj3789@${DB_HOST}:27017/ecomm`;
const url = `mongodb://localhost:27017/ecomm`;

mongoose
  .connect(url, {
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
server.use("/api", Router)
//server.use(isAuth)

server.get("/", (req, res) => {
  res.send("Welcome to the server:) Make requests to the api at /api");
});

server.listen(PORT, ADDRESS, () =>
  console.log(`Server listening at port ${PORT}`)
);
