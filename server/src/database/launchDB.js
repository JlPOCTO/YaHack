const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function launchDB(databasePath) {
    try {
        module.exports.database = await sqlite.open({
            filename: databasePath, driver: sqlite3.Database
        });
    } catch (err) {
        console.error("Ошибка при запуске базы данных:", err);
        process.exit(1);
    }
}

async function closeDB() {
    try {
        await module.exports.database.close();
    } catch (err) {
        console.error("Ошибка при закрытии базы данных:", err);
        process.exit(1);
    }
}

module.exports = {launchDB, closeDB};
