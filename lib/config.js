const fs = require('fs');

class Config {
    set(lib) { 
        return fs.writeFileSync('config.json', JSON.stringify(lib, null, 4));
    }

    get () {
        return JSON.parse(fs.readFileSync('config.json', 'utf8'));
    }
}

module.exports = new Config