const mongoose = require("mongoose");
require("dotenv").config();

//const URL = process.env.MONGO_DB_LOCAL;
const URL = 'mongodb://localhost:27017/ecomm'
console.log(URL);

module.exports = function connectToDatabase() {
  mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected", URL))
    .catch((err) => console.error(err));
};
