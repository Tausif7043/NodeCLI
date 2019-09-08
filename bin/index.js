#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('../lib/inquirer');
const logInfo = require('../lib/logger');
const config = require('../lib/config');
const disconnect = require('../lib/disconnect');
const cpumemory = require('../lib/cpumemory');
const cluster = require('cluster');
const program = require('commander');
const colors = require('colors');

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
            console.log(`Welcome to NODE-Cli App. Server is running at: localhost:` + configValue.portno + '. Please read READ.me file to run the programs');

            var lib = config.get();
            lib.port = configValue.portno;
            config.set(lib);
            for (let i = 0; i < configValue.numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('fork', (worker, code, signal) => {
                logInfo.set(worker).then().catch(err => console.log("Error message:", colors.red(err.msg)))
            });
            cluster.on('disconnect', (deadWorker, code, signal) => {
                if (deadWorker !== undefined) {
                    var worker = cluster.fork();
                    var oldPID = deadWorker.process.pid;
                    var newPID = worker.process.pid;
                    logInfo.deleteById(oldPID);
                    console.log('worker ' + newPID + ' born.');
                    console.log('worker ' + oldPID + ' died.');
                }

            });
            cluster.on('exit', (deadWorker, code, signal) => {
                console.log('worker exited !!!!! ');
            });
            process.on('SIGINT', function () {
                logInfo.clear();
                process.exit();
            });
        }
    } else if (cluster.isWorker) {
        inquirer.runWorkers(config.get().port);
    }
}

program
    .version('0.0.1')
    .description('process management system')

program
    .command('start')
    .alias('s')
    .description('Start CLI')
    .action(() => {
        run()
    });

program
    .command('log')
    .alias('l')
    .description('Log manager with PIDs')
    .action(() => {
        logInfo.get()
    });

program
    .command('clear')
    .alias('c')
    .description('Log manager with PIDs')
    .action(() => {
        logInfo.clear()
    });

program
    .command('exception')
    .alias('e')
    .description('Create exception and run thw worker again')
    .action(() => {
        disconnect.disconnect(res);
    });

program
    .command('cpuusage')
    .alias('cpu')
    .description('Check the CPU usage and Memory usage')
    .action(() => {
        cpumemory.cpuusage();
        cpumemory.memoryusage();
    });
// allow commander to parse `process.argv`
program.parse(process.argv);