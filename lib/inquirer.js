const inquirer = require('inquirer');
const numCPUs = require('os').cpus().length;
const express = require('express');
const disconnect = require('./disconnect');
const app = express();

class Inquirer {
    askCLIConfig() {
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

    runWorkers(port) {
        // Add a basic route – index page
        app.get('/', function (req, res) {
            res.send('Welcome to NODE-CLI App');
        });

        app.get('/disconnect', function (req, res) {
            disconnect.disconnect(res);
        });

        app.get('/disconnectALL', function (req, res) {
            disconnect.disconnectAll(res);
        });

        // Bind to a port
        app.listen(port);
    }
}

module.exports = new Inquirer
