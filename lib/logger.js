// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;
// const inquirer = require('./inquirer');

// // const configValue = await inquirer.askCLIConfig();
// // if (configValue) {
//     cluster.on('fork', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} forked`);
//     });
//     if (cluster.isMaster) {
//         console.log(`Master ${process.pid} is running`);

//         // Fork workers.
//         for (let i = 0; i < numCPUs; i++) {
//             cluster.fork();
//         }

//         cluster.on('exit', (worker, code, signal) => {
//             console.log(`worker ${worker.process.pid} died`);
//         });
//     } else {
//         // Workers can share any TCP connection
//         // In this case it is an HTTP server
//         http.createServer((req, res) => {
//             res.writeHead(200);
//             res.end('hello world\n');
//         }).listen(8000);

//         console.log(`Worker ${process.pid} started`);
//     }
// // }

const cluster = require('cluster');

if (cluster.isMaster) {
  console.log('I am master');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log(`I am worker #${cluster.worker.id}`);
}