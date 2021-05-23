const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const promObserve = require("./promotheus");
const routes = require("../api");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(require("../swagger_out.json"))
  );
  app.use("/api", routes());

  app.get("/", (req, res) => {
    //simulate sleep
    promObserve();
    res.send("Welcome to the server:) Make requests to the api at /api");
  });
};
