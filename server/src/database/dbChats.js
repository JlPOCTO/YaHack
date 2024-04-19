//MessagesDB - хранилище всех сообщений
//Столбцы: chatID, fromID, message, time, IMGPath

//ChatsUsersDB - хранилище пар пользователь-чат
//Столбцы: userID, chatID

//ChatsDB - хранилище чатов
//Столбцы: chatID (autoincrement), name, avatarIMGPath, type

const {database} = require("./launchDB");

async function getMessagesFromChat(chatID) {
    return await database().all(`
        SELECT message, time, fromID, IMGPath 
        FROM MessagesDB WHERE chatID = ${chatID} 
        ORDER BY time;
    `)
}

async function addChat(users, type, name, avatarPath) {
    //TODO check existing chat

    if (type === 'direct') {
        name = "";
        avatarPath = "";
    }

    const newChat = await database().get(`
        INSERT INTO ChatsDB(name, avatarIMGPath, type)
	    VALUES('${name}', '${avatarPath}', '${type}')
	    RETURNING *;
    `);

    if (newChat && 'chatID' in newChat) {
        for (let userID of users) {
            await database().run(`INSERT INTO ChatsUsersDB(userID, chatID) VALUES(${userID}, ${newChat.chatID});`);
        }
    }
    return newChat;
}

async function getChatsByUser(userID) {
    return await database().all(`
        SELECT * FROM ChatsUsersDB chatsUsers
        JOIN ChatsDB chats ON chatsUsers.chatID = chats.chatID
        WHERE chatsUsers.userID = ${userID};
    `);
}

async function addMessage(chatID, fromID, message, time, imgPath) {
    await database().run(`
        INSERT INTO MessagesDB(message, time, fromID, chatID, IMGPath)
	    VALUES ('${message}', '${time}', ${fromID}, ${chatID}, '${imgPath}');
    `);
}

module.exports = {
    getChatsByUser, getMessagesFromChat, addChat, addMessage,
}
