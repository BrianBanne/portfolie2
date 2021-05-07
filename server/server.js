const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const http = require("http");

//const connectToDatabase = require("./database");

require("dotenv").config();

const PORT = 8080;
const ADDRESS = "0.0.0.0;";
//const URL = process.env.MONGO_DB_LOCAL;
const DB_HOST = "simplelinuxvm-tfh4puu22joq4.norwayeast.cloudapp.azure.com";
const URL = `mongodb://adminHans:Tvgj3789@${DB_HOST}:27017/ecomm`;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jdq0r.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

console.log(uri);

/* function connectToDatabase() {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((_) => console.log("Connected to databse"))
    .catch((err) => console.error("connection error:", err));
}

connectToDatabase(); */
const server = express();

dns.resolve("localhost", "ANY", (err, records) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log(records);
  }
});

server.get("/", (req, res) => {
  res.send("This is the backend :)");
});

server.listen(PORT, ADDRESS, () =>
  console.log(`Server listening at port ${PORT}`)
);
