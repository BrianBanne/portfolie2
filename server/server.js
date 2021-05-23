const https = require("https");
const http = require("http");
const fs = require("fs");
const loaders = require("./loaders");
const express = require("express");
const config = require("./config");

const SSL_OPTIONS = {
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem"),
};

async function startServer() {
  const expressApp = express()
  await loaders(expressApp);

  //Server that redirects all incoming http-requests to https
  http
    .createServer(expressApp)
    .listen(80, () => console.log("Http listening on port 80 "));

  https
    .createServer(SSL_OPTIONS, expressApp)
    .listen(config.port, config.address,  () =>
      console.log(`HTTPS-server listening at port ${config.port}`)
    );
}

startServer();
