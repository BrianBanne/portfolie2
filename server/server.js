const https = require("https");
const http = require("http");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const mongoose = require("mongoose");
const seedDatabase = require("./data/seed");
const Router = require("./routes");

const url = `mongodb://localhost:27017/ecomm`;




const SSL_OPTIONS = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .then(() => seedDatabase(mongoose))
  .catch((err) => console.log(err));

const HTTPS_PORT = 8080;
const ADDRESS = "0.0.0.0";
const server = express();

server.use(express.json());

//Redirects all requests to https
server.use((req, res, next) => {
  req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
});
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(require("./swagger_out.json"))
);
server.use(cors({ exposedHeaders: "user-id" }));
server.use("/api", Router.Public);
server.use("/auth", Router.AuthRouter);
server.use("/api/admin", Router.AdminRouter);
server.use("/api/user", Router.UserRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the server:) Make requests to the api at /api");
});

server.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(client.register.metrics())
});



//Server that redirects all incoming http-requests to https
http
  .createServer((req, res) => {
    res.writeHead(301, {
      Location: "https://" + req.headers.host + req.url,
    });
    res.end();
  })
  .listen(80, () => console.log("Http listening on port 80 "));

https
  .createServer(SSL_OPTIONS, server)
  .listen(HTTPS_PORT, ADDRESS, () =>
    console.log(`HTTPS-server listening at port ${HTTPS_PORT}`)
  );
