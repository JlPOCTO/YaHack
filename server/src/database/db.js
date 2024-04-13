const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

let db = await sqlite.open({
    filename: "./DB/sqlite.db",
    driver: sqlite3.Database
});

module.exports = { db };
