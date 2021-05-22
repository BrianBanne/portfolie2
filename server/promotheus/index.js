const promClient = require("prom-client");

const collectDefaultMetrics = promClient.collectDefaultMetrics;

collectDefaultMetrics({ timeout: 5000 });

const counter = new promClient.Counter({
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

module.exports = observe