const {database} = require("./launchDB");

async function getMessagesFromChat(chatID) {
    return await database().all(`
        SELECT message, time, sender_id, image_path 
        FROM messages WHERE chat_id = ${chatID} 
        ORDER BY time;
    `)
}

async function addChat(users, type, name, avatarPath) {
    //TODO check existing chat

    if (type === 'direct') {
        name = "";
        avatarPath = "";
    }
    await database().run("BEGIN TRANSACTION;")
    try {
        const newChat = await database().get(`
            INSERT INTO chats(name, avatar_path, type)
            VALUES('${name}', '${avatarPath}', '${type}')
            RETURNING *;
        `)

        if (newChat && 'id' in newChat) {
            for (let userID of users) {
                await database().run(`INSERT INTO users_in_chats(user_id, chat_id) VALUES(${userID}, ${newChat.id});`);
            }
            await database().run("COMMIT;")
            return newChat
        }
    } catch (e) {
        console.error(e);
    }
    console.error("Error while adding chat");
    await database().run("ROLLBACK");
}

async function getChatsByUser(userID) {
    return await database().all(`
        SELECT *
        FROM chats 
        WHERE id IN (
              SELECT chat_id
              FROM users_in_chats
              WHERE user_id = ${userID}  
        );
    `);
}


async function addMessage(chatID, senderID, message, time, imagePath) {
    await database().run(`
        INSERT INTO messages(message, time, sender_id, chat_id, image_path)
	    VALUES ('${message}', ${time}, ${senderID}, ${chatID}, '${imagePath}');
    `);
}

module.exports = {
    getChatsByUser, getMessagesFromChat, addChat, addMessage,
}
