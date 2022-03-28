const { MongoClient } = require('mongodb');

// Connection URL
const URl = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URl);

// Database
let database = client.db(process.env.DB_NAME);

async function connect() {
    // Use connect method to connect to the server
    try {
        await client.connect();
        database = await client.database(dbName);
        console.log('Connected successfully to local db');
    } catch (err) {
        console.error('Could not connect to local db')
        console.error(err);
    }

    return 'done.';
}

function connectCallback(callback) {
    // Use connect method to connect to the server
    client.connect((error, res) => {
        if (error) {
            console.error('Could not connect to local db')
            console.error(err);
        } else {
            console.log('Connected successfully to local db');
            callback();
        }
    });
}

module.exports = {
    connect,
    connectCallback,
    database,
}