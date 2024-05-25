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

async function getAllMessageReactions(message_id) {
    const TAG = "getAllMessageReactionst"

    try {
        const reactions = await db.database.all(`SELECT * FROM reactions WHERE message_id = ?`, id)
        return reactions
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

async function addReaction(message_id, user_id, reaction) {
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

async function deleteReactionsByMessageId(message_id) {
    const TAG = "deleteReaction"

    try {
        await db.database.run(`DELETE FROM reactions WHERE message_id = ?`, message_id)
        return true
    } catch (e) {
        logError(TAG, arguments, e)
    }
}

module.exports = {
    getReaction,
    addReaction,
    deleteReaction,
    deleteReactionsByMessageId,
    getAllMessageReactions
}