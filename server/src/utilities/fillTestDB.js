const {launchDB, closeDB} = require('../database/launchDB');
const users = require('../database/dbUsers');
const chats = require('../database/dbChats');
const messages = require('../database/dbMessages');

(async () => {
    await launchDB(process.argv[2]);

    await users.addUser(1, "Danil Gavrilov", "gr33n-m1ner", "");
    await users.addUser(2, "Petrov Petr", "petrov_petr", "");
    await users.addUser(3, "Ryan Gosling", "gosling123", "");

    await chats.addChat([1, 2], 'direct', "", "");
    await chats.addChat([1, 2, 3], 'group', "Group1", "");
    await chats.addChat([2, 3], 'group', "Group2", "");
    await chats.addChat([1, 3], 'group', "Group3", "");
    await chats.addChat([1, 2, 3], 'group', "Group1", "");
    await chats.addChat([2, 3], 'group', "Group2", "");
    await chats.addChat([1, 3], 'group', "Group3", "");
    await chats.addChat([1, 2, 3], 'group', "Group1", "");
    await chats.addChat([2, 3], 'group', "Group22", "");
    await chats.addChat([1, 3], 'group', "������", "");
    await chats.addChat([1, 2, 3], 'group', "���", "");
    await chats.addChat([2, 3], 'group', "/*-+5+6-*", "");
    await chats.addChat([1, 3], 'group', "DROP DATABASE chats", "");
    await chats.addChat([1, 2, 3], 'group', "wwqe", "");
    await chats.addChat([2, 3], 'group', "33", "");
    await chats.addChat([1, 3], 'group', "332es", "");

    await messages.addMessage(1, 1, "Hello Petr", "", 0);
    await messages.addMessage(2, 1, "Hello Danil", "", 1);
    await messages.addMessage(1, 2, "Hi everyone", "", 1);
    await messages.addMessage(2, 2, "Hi", "", 2);
    await messages.addMessage(3, 2, "Hi.", "", 3);

    await closeDB();
})();
