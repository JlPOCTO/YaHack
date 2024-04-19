//MessagesDB - хранилище всех сообщений
//Столбцы: chatID, fromID, message, time, IMGPath

//ChatsUsersDB - хранилище пар пользователь-чат
//Столбцы: userID, chatID

//ChatsDB - хранилище чатов
//Столбцы: chatID (autoincrement), name, avatarIMGPath, type

const {database} = require("./launchDB");

async function getMessages(chatID) {
    return await database().all(`
        SELECT message, time, fromID, IMGPath 
        FROM MessagesDB WHERE chatID = ${chatID} 
        ORDER BY time;
    `)
}

async function addChat(users, type, name, avatarImgPath) {
    //TODO check existing chat

    if (type === 'direct') {
        name = "";
        avatarImgPath = "";
    }

    const res = await database().get(`
        INSERT INTO ChatsDB(name, avatarIMGPath, type)
	    VALUES('${name}', '${avatarImgPath}', '${type}')
	    RETURNING *;
    `);

    if (res && res.chatID) {
        for (let user of users) {
            await database().run(`INSERT INTO ChatsUsersDB(userID, chatID) VALUES(${user}, ${res.chatID});`);
        }
    }
    return res;
}

async function getChats(userID) {
    const res = await database().all(`
        SELECT * FROM ChatsUsersDB chatsUsers
        JOIN ChatsDB chats ON chatsUsers.chatID = chats.chatID
        WHERE chatsUsers.userID = ${userID};
    `);
    return res ? res : [];
}


async function addMessage(chatID, fromID, message, time, imgPath) {
    await database().run(`
        INSERT INTO MessagesDB(message, time, fromID, chatID, IMGPath)
	    VALUES ('${message}', '${time}', ${fromID}, ${chatID}, '${imgPath}');
    `);
}

module.exports = {
    getChats, getMessages, addChat, addMessage,
}
