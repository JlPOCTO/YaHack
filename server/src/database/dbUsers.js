const { createTable } = require('./launchDB');

//UsersDB - хранилище всех пользователей
//Столбцы: userID (autoincrement), name, login, avatarPath

async function addUser(db, userID, userName, userLogin) {
    //TODO const IMGPath = generateIMG();
    const IMGPath = "";
    await db.exec(`INSERT OR IGNORE INTO UsersDB(userID, name, login, avatarPath)
                VALUES(${userID}, "${userName}", "${userLogin}", "${IMGPath}")`);
}

async function deleteUser(db, userID) {
    await db.exec(`DELETE FROM UsersDB WHERE userID = ${userID}`);
}

async function findByID(db, userID) {
    const res = await db.get(`SELECT * FROM UsersDB WHERE userID = ${userID}`);
    if (res === undefined) return [];
    return res;
}

async function findByLogin(db, nickname) {
    const res = await db.get(`SELECT * FROM UsersDB WHERE login = "${nickname}"`);
    if (res === undefined) return [];
    return res;
}

async function createTables() {
    await createTable("./DB/sqlite.db", "UsersDB", `(
		userID INTEGER PRIMARY KEY,
		name TEXT,
		login TEXT,
		avatarPath VARCHAR(255)
		);`);
}

module.exports = {
    addUser,
    deleteUser,
    findByID,
	findByLogin,
	createTables,
}
