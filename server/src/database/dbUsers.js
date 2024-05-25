const db = require("./launchDB")
const {logError} = require('../utilities/logging')
const {convertUser} = require("../utilities/converters")

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
            return convertUser(user)
        }
        logError("getUserById", arguments, "Пользователя с заданным id не существует")
    } catch (e) {
        logError("getUserById", arguments, e)
    }
}

async function getAllUsers() {
    try {
        return (await db.database.all(`SELECT * FROM users`)).map(convertUser)
    } catch (e) {
        logError("getAllUsers", arguments, e)
    }
}

async function getUserByLogin(login) {
    try {
        const user = await db.database.get(`SELECT * FROM users WHERE login = ?`, login)
        if (user) {
            return convertUser(user)
        }
        logError("getUserByLogin", arguments, "Пользователя с заданным логином не существует")
    } catch (e) {
        logError("getUserByLogin", arguments, e)
    }
}

async function isUserExists(id) {
    try {
        const userId = await db.database.get(`SELECT id FROM users WHERE id = ?`, id)
        return userId !== undefined
    } catch (e) {
        logError("isUserExists", arguments, e)
    }
}

module.exports = {
    addUser, getUserById, getUserByLogin, getAllUsers, isUserExists
}
