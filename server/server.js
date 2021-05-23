const https = require("https");
const http = require("http");
const fs = require("fs");
const loaders = require("./loaders");
const express = require("express");

const SSL_OPTIONS = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

async function startServer() {
  //Redirects all requests to https
  /* server.use((req, res, next) => {
    req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
  }); */

  await loaders.default(express);

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
}

startServer();

/* server.get("/", (req, res) => {

  //simulate sleep
  var start = new Date()
  var simulateTime = 1000

  setTimeout(function(argument) {
    var end = new Date() - start
    histogram.observe(end / 1000);
  }, simulateTime)

  counter.inc();
  res.send("Welcome to the server:) Make requests to the api at /api");
});

server.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(client.register.metrics())
}) */
