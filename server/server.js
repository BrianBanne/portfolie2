const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const seedDatabase = require("./data/seed");
const Router = require("./routes");

//const DB_HOST = "simplelinuxvm-tfh4puu22joq4.norwayeast.cloudapp.azure.com";
//const URL = `mongodb://adminHans:Tvgj3789@${DB_HOST}:27017/ecomm`;
//const mongoCloudUrl = `mongodb+srv://admin:${process.env.MONOG_CLOUD_PASSWORD}@portfolie2.dk8ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log('password', process.env.MONOG_CLOUD_PASSWORD);
console.log('secret', process.env.MONGO_URL);

const url = `mongodb://${process.env.MONGO_URL}:27017/ecomm`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .then(() => seedDatabase(mongoose))
  .catch((err) => console.log(err));

const PORT = 8080;
const ADDRESS = "0.0.0.0";
const server = express();

server.use(express.json());
server.use(cors({ exposedHeaders: 'user-id' }));
server.use("/api", Router.Public);
server.use("/auth", Router.AuthRouter);
server.use("/api/admin", Router.AdminRouter);
server.use("/api/user", Router.UserRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the server:) Make requests to the api at /api");
});

server.listen(PORT, ADDRESS, () =>
  console.log(`Server listening at port ${PORT}`)
);
