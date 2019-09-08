const os = require('os');
class CPUMemory {
    
    cpuusage() {
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

    memoryusage() {
        console.log("Total Memory:", os.totalmem());
        console.log("Free Memory:", os.freemem())
    }
}

module.exports = new CPUMemory


