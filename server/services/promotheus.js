/* const promClient = require("prom-client");

const register = new promClient.Registry();

register.setDefaultLabels({
  app: "server",
});

promClient.collectDefaultMetrics({ register });

const httpReqDuration = new client.Histogram({
  name: 'http_request_duration_',
  help: 'Duration of HTTP requests',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
})

register.registerMetric(httpReqDuration)

/* const counter = new promClient.Counter({
  name: "node_request_operations_total",
  help: "The total number of processed requests",
});

const histogram = new promClient.Histogram({
  name: "node_request_duration_seconds",
  help: "Histogram for the duration in sec",
  buckets: [1, 2, 5, 6, 10],
});

function observe() {
  var start = new Date();
  var simulateTime = 1000;

  setTimeout(function (argument) {
    var end = new Date() - start;
    histogram.observe(end / 1000);
  }, simulateTime);

  counter.inc();
} 

function getMetrics(req, res) {
  res.setHeader("Content-Type", register.contentType);
  res.end(register.metrics());
}

module.exports = { observe, getMetrics };
 */