const db = require("./launchDB")
const {logError} = require("../utilities/logging")
const {renameMessageFields, renameReactionFields} = require("../utilities/converters")


async function getMessage(id) {
    try {
        const message = await db.database.get(`SELECT * FROM messages WHERE id = ?`, id)
        if (!message) {
            logError("getMessage", arguments, "Сообщения с заданным id не существует")
            return
        }
        message.reactions = await db.database.all(`SELECT * FROM reactions WHERE message_id = ?`, id)
        message.reactions = message.reactions.map(renameReactionFields)
        return renameMessageFields(message)
    } catch (e) {
        logError("getMessage", arguments, e)
    }
}

async function getMessageByReactionId(reactionId) {
    const TAG = "getMessageByReactionId"
    try {
        const reaction = await db.database.get(`SELECT message_id FROM reactions WHERE id = ?`, reactionId)
        if (reaction === undefined) {
            logError(TAG, arguments, "Не получилось достать реакцию")
            return
        }

        const message = await getMessage(reaction.message_id)
        if (message === undefined) {
            logError(TAG, arguments, "Не получилось достать сообщение")
            return
        }
        return message
    } catch (e) {
        logError(TAG, arguments, e)
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
        newMessage.reactions = []
        return renameMessageFields(newMessage)
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
        last.reactions = last.reactions.map(renameReactionFields)
        return renameMessageFields(last)
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
            message.reactions = message.reactions.map(renameReactionFields)
        }
        return messages.map(renameMessageFields)
    } catch (e) {
        logError("getMessagesFromChat", arguments, e)
    }
}

module.exports = {
    getMessage,
    getMessageByReactionId,
    getMessagesFromChat,
    addMessage,
    deleteMessage,
    getLastMessage,
}
