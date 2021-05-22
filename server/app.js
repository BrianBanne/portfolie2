const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const promObserve = require("./promotheus");
const app = express();
const Router = require("./routes");
const connectToDB = require("./database/connect-db");

connectToDB();

app.use(express.json());
app.use(cors())
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(require("./swagger_out.json"))
);
app.use("/api", Router.Public);
app.use("/auth", Router.AuthRouter);
app.use("/api/admin", Router.AdminRouter);
app.use("/api/user", Router.UserRouter);

app.get("/", (req, res) => {
  //simulate sleep
  promObserve();
  res.send("Welcome to the server:) Make requests to the api at /api");
});

module.exports = app