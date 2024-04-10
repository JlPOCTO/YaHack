const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

//UsersDB - хранилище всех пользователей
//Столбцы: userID (autoincrement), name, login, avatarIMGPath

async function addUser(db, userName, userNickname) {
    //TODO const IMGPath = generateIMG();
    const IMGPath = "";
    await db.exec(`INSERT INTO UsersDB(name, login, avatarIMGPath) VALUES(${userName}, ${userNickname}, ${IMGPath})`);
}

//Или не нада?..
async function deleteUser(db, userID) {
    await db.exec(`DELETE FROM UsersDB WHERE userID = ${userID}`);
}

async function findByID(db, userID) {
    const res = await db.get(`SELECT name, login FROM UsersDB WHERE userID = ${userID}`);
    if (res === undefined) return "";
    return res;
}

async function findByNickname(db, nickname) {
    const res = await db.get(`SELECT userID FROM UsersDB WHERE login = ${nickname}`);
    if (res === undefined) return "";
    return res;
}

module.exports = {
    addUser,
    deleteUser,
    findByID,
    findByNickname,
}