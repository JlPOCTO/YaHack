const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

let db;

async function launchDB(databasePath) {
    try {
        db = await sqlite.open({
            filename: databasePath, driver: sqlite3.Database
        });
    } catch (err) {
        console.error("Ошибка при запуске базы данных:", err);
        process.exit(1);
    }
}

async function closeDB() {
    try {
        await db.close()
    } catch (err) {
        console.error("Ошибка при закрытии базы данных:", err);
        process.exit(1);
    }
}

function database() {
    return db;
}

module.exports = {launchDB, database, closeDB};
