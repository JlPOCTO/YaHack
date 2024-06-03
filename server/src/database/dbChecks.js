const db = require("./launchDB");
const {logError} = require("../utilities/logging");

async function isUserExists(id) {
    try {
        const userId = await db.database.get(`SELECT id FROM users WHERE id = ?`, id)
        return userId !== undefined
    } catch (e) {
        logError("isUserExists", arguments, e)
    }
}

async function isUserExistsByLogin(login) {
    try {
        const user = await db.database.get(`SELECT id FROM users WHERE login = ?`, login)
        return user !== undefined
    } catch (e) {
        logError("isUserByLogin", arguments, e)
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

async function isChatChangeable(id) {
    try {
        const chat = await db.database.get(`SELECT type FROM chats WHERE id = ?`, id)
        return chat.type !== "direct"
    } catch (e) {
        logError("isChatChangeable", arguments, e)
    }
}

async function isUserInChat(chatId, userId) {
    try {
        const entry = await db.database.get(`SELECT * FROM users_in_chats WHERE user_id = ? AND chat_id = ?`, userId, chatId)
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

async function isMessageExists(id) {
    try {
        const message = await db.database.get(`SELECT id FROM messages WHERE id = ?`, id)
        return message !== undefined
    } catch (e) {
        logError("isMessageExists", arguments, e)
    }
}

async function isMessageFromUser(massageId, userId) {
    try {
        const message = await db.database.get(`SELECT id FROM messages WHERE id = ? AND sender_id = ?`, massageId, userId)
        return message !== undefined
    } catch (e) {
        logError("isMessageFromUser", arguments, e)
    }
}

async function isMessageInChat(messageId, chatId) {
    try {
        const message = await db.database.get(`SELECT id FROM messages WHERE id = ? AND chat_id = ?`, messageId, chatId)
        return message !== undefined
    } catch (e) {
        logError("isMessageInChat", arguments, e)
    }
}

async function isMessageAccessible(messageId, userId) {
    const TAG = "isMessageAccessible"
    try {
        const message = db.database.get(`SELECT chat_id FROM messages WHERE id = ?`, messageId)
        return message.then((res) => {
            if (!res) {
                return
            }
            return isUserInChat(userId, res.chatId)
        })
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

async function isReactionExists(id) {
    const TAG = "isReactionExists"
    try {
        const reaction = await db.database.get(`SELECT * FROM reactions WHERE id = ?`, id)
        return reaction !== undefined
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

module.exports = {
    isUserExists,
    isUserExistsByLogin,
    isChatExists,
    isUserInChat,
    isChatEmpty,
    isChatChangeable,
    isMessageExists,
    isMessageFromUser,
    isMessageInChat,
    isMessageAccessible,
    isReactionExists
}
