const mongoose = require("mongoose");
const seedDatabase = require("./data/seed");

//const DB_URL = `mongodb://db:27017/ecomm`;

function connectToDB() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .then(() => seedDatabase(mongoose))
    .catch((err) => console.log(err));
}

module.exports = connectToDB;
