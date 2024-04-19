const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

let db;

async function launchDB() {
    try {
        db = await sqlite.open({
            filename: process.env.DATABASE, driver: sqlite3.Database
        });
    } catch (err) {
        console.error("Launch failed");
    }
}

function database() {
    return db
}

module.exports = {launchDB, database};
