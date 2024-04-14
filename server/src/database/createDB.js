(async () => {
    const usersDB = require('./database/dbUsers');
    const chatsDB = require('./database/dbChats');

    await usersDB.createTables();
    await chatsDB.createTables();
})();
