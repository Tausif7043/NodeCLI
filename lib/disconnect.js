const cluster = require('cluster');
const logInfo = require('../lib/logger');

class Disconnect {
    disconnect(res) {
        var worker = cluster.worker;
        setTimeout(function () {
            // disconnect from the cluster            
            if (worker) worker.disconnect();
        }, 2000); 
        res.send("Worker " + worker.id + " is disconnecting ");
    }
    disconnectAll(res) {
        // disconnect from the cluster            
        for (const id in cluster.workers) {
            cluster.workers[id].disconnect();
        }; 
        logInfo.clear();
        res.send("Worker ");
    }
}
module.exports = new Disconnect