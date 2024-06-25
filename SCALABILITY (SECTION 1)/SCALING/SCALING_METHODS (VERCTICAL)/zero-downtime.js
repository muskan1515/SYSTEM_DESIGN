const http = require("http");
const cluster = require("cluster");
const CPUNums = require("os").cpus().length;

if (cluster.isMaster) {
  console.log("Master process", process.pid);
  for (let i = 0; i < CPUNums; i++) {
    cluster.fork();
  }
  //As master process usually manages the worker processes
  // thats why killing of a worker process is being maintained 
  // by master
  cluster.on("exit", (worker) => {
    console.log(`Worker process ${process.pid} died.`);
    console.log("starting new process");
    cluster.fork();
  });
} else {
 //Worker have a specific centralized working behaviour 
  console.log(`started a worker at ${process.pid}`);
  http
    .createServer((req, res) => {
      res.end(`process: ${process.pid}`);
      if (req.url === "/kill") {
        process.exit();
      } else if (req.url === "/") {
        console.log(`serving from ${process.pid}`);
      }
    })
    .listen(3000);

    const app = express();

// Express server code
//   app.get("/", (req, res) => {
//     res.send(`Serving from process: ${process.pid}`);
//     console.log(`Serving from process: ${process.pid}`);
//   });

//   app.get("/kill", (req, res) => {
//     res.send(`Killing process: ${process.pid}`);
//     process.exit();
//   });

//   app.listen(3000, () => {
//     console.log(`Worker started at process ${process.pid}`);
//   });
}
