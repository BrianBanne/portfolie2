const mongoose = require("mongoose");
const config = require("../config");
const Customer = require("../models/customer");
const User = require("../models/user");
const seedDatabase = require("./seed");

//const DB_URL = `mongodb://db:27017/ecomm`;

async function connectToDB() {
  mongoose
    .connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .then(() => seedDatabase(mongoose))
    .catch((err) => console.log(err));
}

module.exports = connectToDB;
