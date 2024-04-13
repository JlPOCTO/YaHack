const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const dbCreate = require('./dbCreate');

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
	//TODO check existing chat
	if (name === undefined) {
		name = "";
		for (let user of users) {
			name += user + "_";
		}
	}
	name += "AUTO";
	let newID = -1;

	const res = await db.get(`INSERT INTO ChatsDB(name)\
	VALUES(\"${name}\")\
	RETURNING *`);

	if (res !== undefined) {
		newID = res.chatID;
	}

	if (newID != -1) {
		for (let user of users) {
			await db.exec(`INSERT INTO ChatsUsersDB(userID, chatID) VALUES(${user}, ${newID})`);
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
	await db.exec(`INSERT INTO MessageDB(message, time, fromID, chatID) VALUES (\"${message}\", \"${time}\", ${fromID}, ${chatID})`);
}

async function createTables() {
	await dbCreate.checkDB("./DB/Chats.db", "MessageDB", "(\
		chatID INTEGER,\
		fromID INTEGER,\
		message TEXT,\
		time VARCHAR(255),\
		FOREIGN KEY(chatID) REFERENCES ChatsDB(chatID)\
		);");
	await dbCreate.checkDB("./DB/Chats.db", "ChatsUsersDB", "(\
		chatID INTEGER,\
		userID INTEGER,\
		PRIMARY KEY (chatID, userID),\
		FOREIGN KEY(chatID) REFERENCES ChatsDB(chatID)\
		);");
	await dbCreate.checkDB("./DB/Chats.db", "ChatsDB", "(\
		chatID INTEGER PRIMARY KEY,\
		name VARCHAR(255)\
		);");
}

module.exports = {
	getChats,
	getMessages,
	addChat,
	addMessage,
	createTables,
}