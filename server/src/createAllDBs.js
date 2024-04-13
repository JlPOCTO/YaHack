(async () => {
    const sqlite3 = require('sqlite3');
    const sqlite = require('sqlite');
    const usersDB = require('./database/dbUsers');
    const chatsDB = require('./database/dbChats');

    await usersDB.createTables();
    await chatsDB.createTables();
})();