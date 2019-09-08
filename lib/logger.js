const config = require('./config');
const colors = require('colors');
var pidusage = require('pidusage');
const { addWorker, getWorker, deleteAllWorker, deleteWorkerById } = require('../schema/process');

class LogInfo {

  set(worker) {
    return new Promise((resolve, reject) => {
      pidusage(worker.process.pid, function (err, stats) {
        if (err) reject(err)
        var processInfo = {
          APP_NAME: config.get().APP_NAME,
          id: "",
          mode: 'Fork',
          pid: worker.process.pid,
          status: worker.process.connected ? 'online' : 'offline',
          cpu: stats.cpu,
          mem: stats.memory,
          ppid: stats.ppid,
          ctime: stats.ctime,
          elapsed: stats.elapsed,
          timestamp: stats.timestamp
        }
        addWorker(processInfo)
      })
    })
  }

  get() {
    getWorker().then((worker) => {
      var strucData = []; 
      if (worker !== [] || worker !== null) {
        worker.forEach(element => {
          var dataJS = {
            APP_NAME: element.APP_NAME,
            mode: element.mode,
            pid: element.pid,
            status: element.status,
            cpu: element.cpu,
            mem: element.mem,
            ppid: element.ppid,
            ctime: element.ctime,
            elapsed: element.elapsed,
            timestamp: element.timestamp
          }
          strucData.push(dataJS)
        });
        console.table(strucData);
      } else {
        console.log('%s', colors.red('No record available'))
      }

    })

  }

  deleteById(id) {
    deleteWorkerById(id)
  }

  clear() {
    deleteAllWorker();
  }
}

module.exports = new LogInfo