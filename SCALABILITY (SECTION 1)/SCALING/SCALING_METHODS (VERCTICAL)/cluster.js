const http = require("http");
const cluster = require("cluster");
const CPUNums = require("os").cpus().length;

if (cluster.isMaster) {
  console.log("Master process", process.pid);
  for (let i = 0; i < CPUNums; i++) {
    cluster.fork();
  }
} else {
  http
    .createServer((req, res) => {
      const message = `Worker: ${process.pid}`;
      console.log(message);
      res.end(message);
    })
    .listen(3000);
}
