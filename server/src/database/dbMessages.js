const db = require("./launchDB")
const {logError} = require("../utilities/logging")
const {convertMessage} = require("../utilities/converters")


async function getMessage(id) {
    try {
        const message = await db.database.get(`SELECT * FROM messages WHERE id = ?`, id)
        if (!message) {
            logError("getMessage", arguments, "Сообщения с заданным id не существует")
            return
        }
        message.reactions = await db.database.all(`SELECT * FROM reactions WHERE message_id = ?`, id)
        return convertMessage(message)
    } catch (e) {
        logError("getMessage", arguments, e)
    }
}

async function addMessage(senderId, chatId, message, imagePath, time) {
    try {
        const newMessage = await db.database.get(`
            INSERT INTO messages(sender_id, chat_id, message, image_path, time)
            VALUES(?, ?, ?, ?, ?)
            RETURNING *
        `, ...arguments)
        if (!newMessage) {
            logError("addMessage", arguments, "Не получилось добавить сообщение")
            return
        }
        newMessage.reactions = await db.database.all(`SELECT * FROM reactions WHERE message_id = ?`, newMessage.id)
        return convertMessage(newMessage)
    } catch (e) {
        logError("addMessage", arguments, e)
    }
}

async function deleteMessage(id) {
    await db.database.run("BEGIN TRANSACTION")
    try {
        await db.database.run(`DELETE FROM messages WHERE id = ?`, id)
        await db.database.run(`DELETE FROM reactions WHERE message_id = ?`, id)
        await db.database.run("COMMIT")
        return true
    } catch (e) {
        logError("deleteMessage", arguments, e)
        await db.database.run("ROLLBACK")
    }
}

async function getLastMessage(chatId) {
    try {
        const last = await db.database.get(`
            SELECT * FROM messages WHERE chat_id = ? 
            ORDER BY time DESC LIMIT 1`, chatId)

        if (!last) {
            logError("getLastMessage", arguments, "В чате нет последнего сообщения")
            return
        }
        last.reactions = await db.database.all(`SELECT * FROM reactions WHERE message_id = ?`, last.id)
        return convertMessage(last)
    } catch (e) {
        logError("getLastMessage", arguments, e)
    }
}

async function getMessagesFromChat(chatId, lastId) {
    if (!lastId) {
        lastId = 0
    }
    try {
        const messages = await db.database.all(`SELECT * FROM messages 
            WHERE chat_id = ? AND id > ? ORDER BY time`, chatId, lastId)
        for (let message of messages) {
            message.reactions = await db.database.all(`SELECT * FROM reactions WHERE message_id = ?`, message.id)
        }
        return messages.map(convertMessage)
    } catch (e) {
        logError("getMessagesFromChat", arguments, e)
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

async function isMessageFromUser(id, userId) {
    try {
        const message = await db.database.get(`SELECT id FROM messages WHERE id = ? AND sender_id = ?`, id, userId)
        return message !== undefined
    } catch (e) {
        logError("isMessageFromUser", arguments, e)
    }
}

async function isMessageInChat(id, chatId) {
    try {
        const message = await db.database.get(`SELECT id FROM messages WHERE id = ? AND chat_id = ?`, id, chatId)
        return message !== undefined
    } catch (e) {
        logError("isMessageInChat", arguments, e)
    }
}


module.exports = {
    getMessagesFromChat,
    addMessage,
    getMessage,
    deleteMessage,
    getLastMessage,
    isMessageExists,
    isMessageFromUser,
    isMessageInChat
}
