const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

//MessageDB - хранилище всех сообщений
//Столбцы: chatID, fromID, message, time
//ChatsUsersDB - хранилище пар пользователь-чат
//Столбцы: userID, chatID
//ChatsDB - хранилище чатов
//Столбцы: chatID (autoincrement), name
async function getMessages(db, chatID) {
	const res = await db.get(`SELECT message, time, fromID FROM MessageDB WHERE chatID = ${chatID} ORDER BY time`);
	if (res === undefined) return [];
	return res;
}

async function addChat(db, users, name) {
	if (name === undefined) {
		for (let user in users) {
			name += String(user) + " ";
		}
	}
	let newID = -1;
	db.serialize(function () {
		db.run('BEGIN TRANSACTION');
		db.run(`INSERT INTO ChatsDB(name) VALUES (${name})`, function (err) {
			if (err) {
				db.run('ROLLBACK');
			} else {
				newID = this.lastID; 
				db.run('COMMIT');
			}
		});
	});
	if (newID != -1) {
		for (let user in users) {
			db.exec(`INSERT INTO ChatsUsersDB(userID, chatID) VALUES(${user}, ${newID})`);
		}
	}
	return newID;
}
async function getChats(db, userID) {
	const res = await db.get(`SELECT chats.chatID, chats.name
                              FROM ChatsUsersDB cuDB
                              JOIN ChatsDB chats ON cuDB.chatID = chats.chatID
                              WHERE cuDB.userID = ${userID}`);
	if (res === undefined) return [];
	return res;
}


async function addMessage(db, chatID, fromID, message, time) {
	await db.exec(`INSERT INTO MessageDB(message, time, fromID, chatID) VALUES (${message}, ${time}, ${fromID}, ${chatID})`;
}

module.exports = {
	getChats,
	getMessages,
	addChat,
	addMessage,
}