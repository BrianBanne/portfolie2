const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({
  autoregister: true,
  includeStatusCode: true,
  includePath: true,
  includeMethod: true,
});

module.exports = metricsMiddleware