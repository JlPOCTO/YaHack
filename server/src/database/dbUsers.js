const {database} = require("./launchDB");

//UsersDB - хранилище всех пользователей
//Столбцы: userID (autoincrement), name, login, avatarPath

async function addUser(id, name, login, avatarPath) {
    await database().run(`
        INSERT OR IGNORE INTO UsersDB(userID, name, login, avatarPath)
        VALUES(${id}, '${name}', '${login}', '${avatarPath}');
    `);
}

async function deleteUser(id) {
    await database().run(`DELETE FROM UsersDB WHERE userID = ${id};`);
}

async function findUserByID(id) {
    const user = await database().get(`SELECT * FROM UsersDB WHERE userID = ${id};`);
    return user ? user : [];
}

async function findUserByLogin(login) {
    const user = await database().get(`SELECT * FROM UsersDB WHERE login = '${login}';`);
    return user ? user : [];
}

module.exports = {
    addUser, deleteUser, findUserByID, findUserByLogin,
}
