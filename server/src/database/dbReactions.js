const db = require("./launchDB")
const {logError} = require("../utilities/logging")

async function getReaction(id) {
    const TAG = "getReaction"

    try {
        const reaction = await db.database.get(`SELECT * FROM reactions WHERE id = ?`, id)
        if (!reaction) {
            logError(TAG, arguments, "Реакция с заданным id не существует")
            return
        }
        return reaction
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

async function getReactionsByMessage(messageId) {
    const TAG = "getReactionsByMessage"
    try {
        return await db.database.all(`SELECT * FROM reactions WHERE message_id = ?`, messageId)
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

async function addReaction(messageId, userId, reaction) {
    const TAG = "addReaction"

    try {
        const newReaction = await db.database.get(`
            INSERT INTO reactions(message_id, user_id, reaction)
            VALUES(?, ?, ?)
            RETURNING *
        `, ...arguments)

        if (!newReaction) {
            logError(TAG, arguments, "Не получилось добавить реакцию")
            return
        }

        return newReaction
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

async function deleteReaction(id) {
    const TAG = "deleteReaction"

    try {
        await db.database.run(`DELETE FROM reactions WHERE id = ?`, id)
        return true
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

async function deleteReactionsFromMessage(messageId) {
    const TAG = "deleteReactionsFromMessage"

    try {
        await db.database.run(`DELETE FROM reactions WHERE message_id = ?`, messageId)
        return true
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

module.exports = {
    getReaction,
    addReaction,
    deleteReaction,
    deleteReactionsFromMessage,
    getReactionsByMessage
}
