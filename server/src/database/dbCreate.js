const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function createTable(path, name, params) {
    const db = await sqlite.open({
        filename: path,
        driver: sqlite3.Database
    });
    await db.exec("PRAGMA foreign_keys = ON;");
    await db.exec(`CREATE TABLE IF NOT EXISTS ${name} ${params}`);
    await db.close();
}

module.exports = { createTable };
