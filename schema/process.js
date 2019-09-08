const mongoose = require('mongoose'); // An Object-Document Mapper for Node.js
const assert = require('assert'); // N.B: Assert module comes bundled with Node.js.
mongoose.Promise = global.Promise; // Allows us to use Native promises without throwing error.
var MongoClient = require('mongodb').MongoClient;


// Connect to a single MongoDB instance. The connection string could be that of a remote server
// We assign the connection instance to a constant to be used later in closing the connection
const db = mongoose.connect('mongodb://localhost:27017/process-manager', { useNewUrlParser: true });

// Converts value to lowercase
function toLower(v) {
    return v.toLowerCase();
}

// Define a worker Schema
const workerSchema = mongoose.Schema({
    APP_NAME: { type: String, set: toLower },
    mode: { type: String, set: toLower },
    pid: { type: Number, default: 0 },
    status: { type: String, set: toLower },
    cpu: { type: Number, default: 0 },
    mem: { type: Number, default: 0 },
    ppid: { type: Number, default: 0 },
    ctime: { type: Number, default: 0 },
    elapsed: { type: Number, default: 0 },
    timestamp: { type: Number, default: 0 }
});

// Define model as an interface with the database
const Worker = mongoose.model('Worker', workerSchema);

/**
 * @function  [addWorker]
 * @returns {String} Status
 */
const addWorker = (worker) => {
    Worker.create(worker, (err) => {
        assert.equal(null, err);
        console.info('New Worker added');
        // db.close();
    });
};

/**
 * @function  [getWorker]
 * @returns {Json} workers
 */
const getWorker = () => {
    return Worker.find().exec();
};

/**
 * @function  [getWorker]
 * @returns {Json} workers
 */
const deleteAllWorker = () => {
    return Worker.deleteMany({}).exec();
};

const deleteWorkerById = (id) => {
    return Worker.deleteOne({ pid: id }).exec();
};

// Export all methods
module.exports = { addWorker, getWorker, deleteAllWorker, deleteWorkerById };