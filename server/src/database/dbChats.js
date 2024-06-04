const db = require("./launchDB")
const {logError} = require("../utilities/logging")
const {renameChatFields} = require("../utilities/converters")
const {getUserById} = require("./dbUsers");
const {getLastMessage} = require("./dbMessages");
const {isChatEmpty} = require("./dbChecks");

async function getChat(id) {
    const TAG = "getChat"
    try {
        const chat = await db.database.get(`SELECT * FROM chats WHERE id = ?`, id)
        if (!chat) {
            logError(TAG, arguments, "Чат с заданным id не существует")
            return
        }
        chat.users = (await db.database.all(`SELECT user_id FROM users_in_chats WHERE chat_id = ?`, id))
            .map(entry => {
                if ("user_id" in entry) {
                    return entry.user_id
                } else {
                    throw "Результат sql запроса не содержит поле userId"
                }
            })
        chat.users = await Promise.all(chat.users.map(async id => await getUserById(id)))
        for (const user of chat.users) {
            if (user === undefined) {
                logError(TAG, arguments, "Не получилось достать информацию о пользователе")
                return
            }
        }
        const isEmpty = await isChatEmpty(id)
        if (isEmpty === undefined) {
            logError(TAG, arguments, "Не получилось достать информацию о сообщениях в чате")
        }
        if (!isEmpty) {
            chat.lastMessage = await getLastMessage(id)
            if (chat.lastMessage === undefined) {
                logError(TAG, arguments, "Не получилось достать последнее сообщение в чате")
            }
        }
        return renameChatFields(chat)
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

async function addChat(users, type, name, avatarPath) {
    await db.database.run("BEGIN TRANSACTION")
    try {
        const newChat = await db.database.get(`
            INSERT INTO chats(name, avatar_path, type)
            VALUES(?, ?, ?)
            RETURNING *
        `, name, avatarPath, type)
        if (!newChat || !'id' in newChat) {
            logError("addChat", arguments, "Ошибка при добавлении чата")
        } else {
            for (let userId of users) {
                await db.database.run(`INSERT INTO users_in_chats(user_id, chat_id) VALUES(?, ?)`, userId, newChat.id)
            }
            await db.database.run("COMMIT")
            newChat.users = users
            return renameChatFields(newChat)
        }
    } catch (e) {
        logError("addChat", arguments, e)
    }
    await db.database.run("ROLLBACK")
}

async function deleteChat(id) {
    await db.database.run("BEGIN TRANSACTION")
    try {
        await db.database.run(`DELETE FROM chats WHERE id = ?`, id)
        await db.database.run(`DELETE FROM users_in_chats WHERE chat_id = ?`, id)
        await db.database.run(`DELETE FROM messages WHERE chat_id = ?`, id)
        await db.database.run(`DELETE FROM invite_links WHERE chat_id = ?`, id)
        await db.database.run("COMMIT")
        return true
    } catch (e) {
        logError("deleteChat", arguments, e)
        await db.database.run("ROLLBACK")
    }
}

async function addUserInChat(chatId, userId) {
    try {
        await db.database.run(`INSERT INTO users_in_chats(user_id, chat_id) VALUES(?, ?)`, userId, chatId)
        return true
    } catch (e) {
        logError("addUserInChat", arguments, e)
    }
}

async function deleteUserFromChat(chatId, userId) {
    try {
        await db.database.run(`DELETE FROM users_in_chats WHERE ? = user_id AND ? = chat_id`, userId, chatId)
        return true
    } catch (e) {
        logError("deleteUserFromChat", arguments, e)
    }
}

async function updateChatAvatarPath(chatId, avatarPath) {
    try {
        await db.database.run(`UPDATE chats SET avatar_path = ? WHERE id = ?`, avatarPath, chatId)
        return true
    } catch (e) {
        logError("updateChatAvatarPath", arguments, e)
    }
}

async function addInviteLink(chatId, userId, link) {
    try {
        await db.database.run(`INSERT INTO invite_links(creator_id, chat_id, link) VALUES (?, ?, ?)`, ...arguments)
        return true
    } catch (e) {
        logError("addInviteLink", arguments, e)
    }
}

async function deleteInviteLink(link) {
    try {
        await db.database.run(`DELETE FROM invite_links WHERE ? = link`, link)
        return true
    } catch (e) {
        logError("deleteInviteLink", arguments, e)
    }
}

async function getChatsByUser(userId) {
    try {
        const chatIds = await db.database.all(`SELECT chat_id FROM users_in_chats WHERE user_id = ?`, userId)

        for (let i = 0; i < chatIds.length; i++) {
            if ("chat_id" in chatIds[i]) {
                chatIds[i] = chatIds[i]["chat_id"]
            } else {
                logError("getChatsByUser", arguments, "Возвращенное значение не содержит chatId")
                return
            }
        }

        return (await Promise.all(chatIds.map(chatId => getChat(chatId).then(chat => {
            if (!chat) {
                logError("getChatsByUser", [userId, {chatId: chatId}], "Не получилось достать чат")
            }
            return chat
        })))).filter(x => !!x)
    } catch (e) {
        logError("getChatsByUser", arguments, e)
    }
}


module.exports = {
    getChat,
    deleteChat,
    addUserInChat,
    deleteUserFromChat,
    updateChatAvatarPath,
    addInviteLink,
    getChatsByUser,
    addChat,
    deleteInviteLink,
}
