const {database} = require("./launchDB");

async function addUser(id, name, login, avatarPath) {
    await database().run(`
        INSERT OR IGNORE INTO users(id, name, login, avatar_path)
        VALUES(${id}, '${name}', '${login}', '${avatarPath}');
    `);
}

async function deleteUser(id) {
    await database().run(`DELETE FROM users WHERE id = ${id};`);
}

async function findUserByID(id) {
    const user = await database().get(`SELECT * FROM users WHERE id = ${id};`);
    return user ? user : [];
}

async function findUserByLogin(login) {
    const user = await database().get(`SELECT * FROM users WHERE login = '${login}';`);
    return user ? user : [];
}

module.exports = {
    addUser, deleteUser, findUserByID, findUserByLogin,
}
