const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const routes = require("../api");
const metricsMiddleware = require("./prom-middleware");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(metricsMiddleware);
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(require("../swagger_out.json"))
  );
  app.all("*", secureHttps);
  app.use("/api", routes());

  app.get("/", (req, res) => {
    //simulate sleep
    res.send("Welcome to the server:) Make requests to the api at /api");
  });

};

//automatically redirects calls to http to secure https connection
function secureHttps(req, res, next) {
  return req.secure
    ? next()
    : res.redirect("https://" + req.hostname + ":8080" + req.url);
}
