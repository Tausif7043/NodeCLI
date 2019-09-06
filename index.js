const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
const cpumemory = require('./lib/cpumemory');
const cluster = require('cluster');
const os = require('os');
const http = require('http');
let port = 8000
const run = async () => {

    if (cluster.isMaster) {
        clear();
        console.log(
            chalk.yellow(
                figlet.textSync('NODE-Cli', { horizontalLayout: 'half' })
            )
        );
        const configValue = await inquirer.askCLIConfig();
        if (configValue) {
            port = configValue.portno;
            for (let i = 0; i < configValue.numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('fork', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} forked`);
            });
            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
                // errorMsg();
            });
        }
    } else if (cluster.isWorker) {
        //console.log(`I am worker #${cluster.worker.id}`);
        http.createServer((req, res) => {
            res.writeHead(200);
            res.end('hello world\n');
        }).listen(port);

        console.log(`Worker ${process.pid} started run on port: ${port}`);
    }
}

run()