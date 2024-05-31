const db = require("./launchDB")
const {logError} = require("../utilities/logging")
const {convertChat} = require("../utilities/converters")

async function getChat(id) {
    try {
        const chat = await db.database.get(`SELECT * FROM chats WHERE id = ?`, id)
        if (!chat) {
            logError("getChat", arguments, "Чат с заданным id не существует")
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
        return convertChat(chat)
    } catch (e) {
        logError("getChat", arguments, e)
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
            return convertChat(newChat)
        }
    } catch (e) {
        console.error("addChat", arguments, e)
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

//not tested
async function addInviteLink(chatId, userId, link) {
    try {
        await db.database.run(`INSERT INTO invite_links(creator_id, chat_id, link) VALUES (?, ?, ?)`, ...arguments)
        return true
    } catch (e) {
        logError("addInviteLink", arguments, e)
    }
}

//not tested
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
        const chatIds = (await db.database.all(`SELECT chat_id FROM users_in_chats WHERE user_id = ?`, userId))
            .map(entry => {
                if ("chat_id" in entry) {
                    return entry.chat_id
                } else {
                    throw "Возвращенное значение не содержит chatId"
                }
            })
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

async function isChatExists(id) {
    try {
        const chat = await db.database.get(`SELECT id FROM chats WHERE id = ?`, id)
        return chat !== undefined
    } catch (e) {
        logError("isChatExists", arguments, e)
    }
}

async function isUserInChat(userId, chatId) {
    try {
        const entry = await db.database.get(`SELECT * FROM users_in_chats WHERE user_id = ? AND chat_id = ?`,
            userId, chatId)
        return entry !== undefined
    } catch (e) {
        logError("isUserInChat", arguments, e)
    }
}

async function isChatEmpty(id) {
    try {
        const entry = await db.database.get(`SELECT id FROM messages WHERE chat_id = ? LIMIT 1`, id)
        return entry === undefined
    } catch (e) {
        logError("isChatEmpty", arguments, e)
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
    deleteInviteLink, //not tested
    isChatExists,
    isUserInChat,
    isChatEmpty
}
