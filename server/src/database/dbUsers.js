const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const dbCreate = require('./dbCreate');

//UsersDB - хранилище всех пользователей
//Столбцы: userID (autoincrement), name, login, avatarIMGPath

async function addUser(db, userID, userName, userNickname) {
    //TODO const IMGPath = generateIMG();
    const IMGPath = "";
    await db.exec(`INSERT OR IGNORE INTO UsersDB(userID, name, login, avatarIMGPath)\
                VALUES(${userID}, \"${userName}\", \"${userNickname}\", \"${IMGPath}\")`);
}

//а надо ли?...
async function deleteUser(db, userID) {
    await db.exec(`DELETE FROM UsersDB WHERE userID = ${userID}`);
}

async function findByID(db, userID) {
    const res = await db.get(`SELECT name, login FROM UsersDB WHERE userID = ${userID}`);
    if (res === undefined) return "";
    return res;
}

async function findByNickname(db, nickname) {
    const res = await db.get(`SELECT userID FROM UsersDB WHERE login = \"${nickname}\"`);
    if (res === undefined) return "";
    return res;
}

async function createTables() {
	await dbCreate.checkDB("./DB/db.db", "UsersDB", "(\
		userID INTEGER PRIMARY KEY,\
		name TEXT,\
		login TEXT,\
		avatarIMGPath VARCHAR(255)\
		);");
}

module.exports = {
    addUser,
    deleteUser,
    findByID,
	findByNickname,
	createTables,
}
