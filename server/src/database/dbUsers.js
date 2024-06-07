const db = require("./launchDB")
const {logError} = require('../utilities/logging')
const {renameUserFields} = require("../utilities/converters")

async function addUser(id, name, login, avatarPath) {
    try {
        await db.database.run(`
            INSERT OR IGNORE INTO users(id, name, login, avatar_path)
            VALUES(?, ?, ?, ?)`, ...arguments)
        return true
    } catch (e) {
        logError("addUser", arguments, e)
    }
}

async function getUserById(id) {
    try {
        const user = await db.database.get(`SELECT * FROM users WHERE id = ?`, id)
        if (user) {
            return renameUserFields(user)
        }
        logError("getUserById", arguments, "Пользователя с заданным id не существует")
    } catch (e) {
        logError("getUserById", arguments, e)
    }
}

async function getAllUsers() {
    try {
        return (await db.database.all(`SELECT * FROM users`)).map(renameUserFields)
    } catch (e) {
        logError("getAllUsers", arguments, e)
    }
}

async function getUserByLogin(login) {
    try {
        const user = await db.database.get(`SELECT * FROM users WHERE login = ?`, login)
        if (user) {
            return renameUserFields(user)
        }
        logError("getUserByLogin", arguments, "Пользователя с заданным логином не существует")
    } catch (e) {
        logError("getUserByLogin", arguments, e)
    }
}

async function updateUserAvatar(id, avatarPath) {
    try {
        await db.database.run(`UPDATE users SET avatar_path = ? WHERE id = ?`, avatarPath, id)
        return true
    } catch (e) {
        logError("updateUserAvatar", arguments, e)
    }
}

async function getContacts(id) {
    try {
        const contacts = await db.database.all(`
                SELECT user_id
                FROM users_in_chats
                INNER JOIN (SELECT id FROM chats WHERE type = "direct") AS directs
                ON users_in_chats.chat_id = directs.id
                WHERE user_id <> ?`, id)
        if (contacts === undefined) {
            logError("getContacts", arguments, "Не получилось достать контакты")
            return
        }
        return Promise.all(contacts.map(async entry => await getUserById(entry.user_id)))
    } catch (e) {
        logError("getContacts", arguments, e)
    }
}


module.exports = {
    addUser, getUserById, getUserByLogin, getAllUsers, updateUserAvatar, getContacts
}
