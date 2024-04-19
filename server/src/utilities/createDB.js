const sqlite3 = require("sqlite3");
const sqlite = require("sqlite")
require('dotenv').config();

function makeTable(name, param) {
    return {name: name, params: param}
}

const TABLES = [
    makeTable("MessagesDB", `(
        chatID INTEGER,
        fromID INTEGER,
        message TEXT,
        time VARCHAR(255),
        IMGPath VARCHAR(255),
        FOREIGN KEY(chatID) REFERENCES ChatsDB(chatID))`),
    makeTable("ChatsUsersDB", `(
        chatID INTEGER,
        userID INTEGER,
        PRIMARY KEY (chatID, userID),
        FOREIGN KEY(chatID) REFERENCES ChatsDB(chatID),
        FOREIGN KEY(userID) REFERENCES UsersDB(userID))`),
    makeTable("ChatsDB", `(
        chatID INTEGER PRIMARY KEY,
        name VARCHAR(255),
        avatarIMGPath VARCHAR(255),
        type VARCHAR(255) CHECK (type IN ('direct', 'group')))`),
    makeTable("UsersDB", `(
        userID INTEGER PRIMARY KEY,
        name TEXT,
        login TEXT,
        avatarPath VARCHAR(255))`),
];

(async () => {
    const database = await sqlite.open({
        filename: process.env.DATABASE, driver: sqlite3.Database
    });
    await database.run(`PRAGMA foreign_keys = ON;`);
    await Promise.all(TABLES.map(table => {
        database.run(`CREATE TABLE IF NOT EXISTS ${table.name} ${table.params};`)
    }));
    await database.close();
})();
