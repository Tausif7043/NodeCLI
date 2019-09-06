const inquirer = require('inquirer');
const numCPUs = require('os').cpus().length;
const express = require('express')
const app = express(); 

module.exports = {
    askCLIConfig: askCLIConfig,
    runWorkers: runWorkers
}

function askCLIConfig() {
    const argv = require('minimist')(process.argv.slice(2));
    const questions = [
        {
            name: 'numCPUs',
            type: 'input',
            default: argv._[0],
            message: 'Enter the number of process you need to run:',
            validate: function (value) {
                if (value.length) {
                    return (value <= numCPUs) ? true : 'Number of process cannot exceeds value more than ' + numCPUs;
                } else {
                    return 'Please enter the value';
                }
            }
        },
        {
            name: 'portno',
            type: 'input',
            default: argv._[2],
            message: 'Enter the port number:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter port number.';
                }
            }
        }
    ];
    return inquirer.prompt(questions);
}

function runWorkers(port) {
    // Add a basic route – index page
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    // Bind to a port
    app.listen(port);
    console.log('Application running!');

}
