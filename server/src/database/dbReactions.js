const db = require("./launchDB")
const {logError} = require("../utilities/logging")
const {renameReactionFields} = require("../utilities/converters");

async function getReaction(id) {
    const TAG = "getReaction"

    try {
        const reaction = await db.database.get(`SELECT * FROM reactions WHERE id = ?`, id)
        if (!reaction) {
            logError(TAG, arguments, "Реакция с заданным id не существует")
            return
        }
        return renameReactionFields(reaction)
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

async function getReactionsByMessage(messageId) {
    const TAG = "getReactionsByMessage"
    try {
        const entries = await db.database.all(`SELECT * FROM reactions WHERE message_id = ?`, messageId)
        return entries.map(renameReactionFields)
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

        return renameReactionFields(newReaction)
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

async function deleteReactionById(id) {
    const TAG = "deleteReactionById"
    try {
        await db.database.run(`DELETE FROM reactions WHERE id = ?`, id)
        return true
    } catch (e) {
        logError(TAG, arguments, e)
    }
}


module.exports = {
    getReaction,
    addReaction,
    deleteReactionById,
    getReactionsByMessage
}
