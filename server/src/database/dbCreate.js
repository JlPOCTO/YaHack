const fs = require('fs');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
async function checkDB(dbPath, dbName, params) {
    console.log("creating");
    const db = await sqlite.open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    await db.exec("CREATE TABLE IF NOT EXISTS " + dbName + " " + params);
    await db.close();
}

module.exports = { checkDB };