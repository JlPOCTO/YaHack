(async () => {
    const sqlite3 = require('sqlite3');
    const sqlite = require('sqlite');
    const usersDB = require('./database/dbUsers');
    const chatsDB = require('./database/dbChats');

    await usersDB.createTables();
    await chatsDB.createTables();

    const users = await sqlite.open({
        filename: "./DB/Users.db",
        driver: sqlite3.Database
    });

    const chats = await sqlite.open({
        filename: "./DB/Chats.db",
        driver: sqlite3.Database
    });
    await usersDB.addUser(users, "Test testovich", "uyuigehbj");
    await usersDB.addUser(users, "Other one", "ss");
    await usersDB.addUser(users, "DROP DATABASE", "MessageDB");

    await chatsDB.addChat(chats, [0, 1]);
    await chatsDB.addChat(chats, [0, 2]);
    await chatsDB.addChat(chats, [2, 1]);
    await chatsDB.addMessage(chats, 0, 0, "아니요", new Date(2024, 4, 2, 12, 10).toISOString());
    await chatsDB.addMessage(chats, 0, 1, "Here", new Date(2024, 4, 2, 12, 15).toISOString());
    await chatsDB.addMessage(chats, 0, 1, "Мда", new Date(2024, 4, 2, 12, 20).toISOString());

    await chatsDB.addMessage(chats, 1, 0, "아니요", new Date(2024, 1, 1, 12, 10).toISOString());
    await chatsDB.addMessage(chats, 1, 2, "やめてください", new Date(2024, 4, 2, 12, 10).toISOString());
})();