const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

let db;

async function launchDB() {
    try {
        db = await sqlite.open({
            filename: process.env.DATABASE, driver: sqlite3.Database
        });
    } catch (err) {
        console.error("Ошибка при запуске базы данных:", err);
        process.exit(1);
    }
}

function database() {
    return db;
}

module.exports = {launchDB, database};
