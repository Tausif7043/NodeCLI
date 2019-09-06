const os = require('os');
module.exports = {
    cpuusage: cpuusage,
    memoryusage: memoryusage,
}

function cpuusage() {
    var cpus = os.cpus();

    for (var i = 0, len = cpus.length; i < len; i++) {
        console.log("CPU %s:", i);
        var cpu = cpus[i], total = 0;

        for (var type in cpu.times) {
            total += cpu.times[type];
        }

        for (type in cpu.times) {
            console.log("\t", type, Math.round(100 * cpu.times[type] / total));
        }
    }
}

function memoryusage() {
    console.log(os.totalmem());
    console.log(os.freemem())
}

