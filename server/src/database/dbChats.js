const { createTable } = require('./dbCreate');

//MessagesDB - хранилище всех сообщений
//Столбцы: chatID, fromID, message, time, IMGPath
//ChatsUsersDB - хранилище пар пользователь-чат
//Столбцы: userID, chatID
//ChatsDB - хранилище чатов
//Столбцы: chatID (autoincrement), name, avatarIMGPath, type
async function getMessages(db, chatID) {
	const res = await db.get(`SELECT message, time, fromID, IMGPath FROM MessagesDB WHERE chatID = ${chatID} ORDER BY time`);
	if (res === undefined) return [];
	return res;
}

async function addChat(db, users, type, name) {
	//TODO check existing chat
	if (type === 'direct') {
		name = "";
	}
	let newID;

	const res = await db.get(`INSERT INTO ChatsDB(name, avatarIMGPath, type)
	VALUES("${name}", "", "${type}")
	RETURNING *`);

	if (res) {
		newID = res.chatID;
	}

	if (newID) {
		for (let user of users) {
			await db.exec(`INSERT INTO ChatsUsersDB(userID, chatID) VALUES(${user}, ${newID})`);
		}
	}
	return res;
}
async function getChats(db, userID) {
	const res = await db.get(`SELECT *
                              FROM ChatsUsersDB chatsUsers
                              JOIN ChatsDB chats ON chatsUsers.chatID = chats.chatID
                              WHERE chatsUsers.userID = ${userID}`);
	if (res === undefined) return [];
	return res;
}


async function addMessage(db, chatID, fromID, message, time, IMGPath) {
	await db.exec(`INSERT INTO MessagesDB(message, time, fromID, chatID, IMGPath)
	VALUES ("${message}", "${time}", ${fromID}, ${chatID}, "${IMGPath}")`);
}

async function createTables() {
	await createTable("./DB/sqlite.db", "MessagesDB", `(
		chatID INTEGER,
		fromID INTEGER,
		message TEXT,
		time VARCHAR(255),
		IMGPath VARCHAR(255),
		FOREIGN KEY(chatID) REFERENCES ChatsDB(chatID)
		);`);
	await createTable("./DB/sqlite.db", "ChatsUsersDB", `(
		chatID INTEGER,
		userID INTEGER,
		PRIMARY KEY (chatID, userID),
		FOREIGN KEY(chatID) REFERENCES ChatsDB(chatID),
		FOREIGN KEY(userID) REFERENCES UsersDB(userID)
		);`);
	await createTable("./DB/sqlite.db", "ChatsDB", `(
		chatID INTEGER PRIMARY KEY,
		name VARCHAR(255),
		avatarIMGPath VARCHAR(255),
		type VARCHAR(255) CHECK (type IN ('direct', 'group'))
		);`);
}

module.exports = {
	getChats,
	getMessages,
	addChat,
	addMessage,
	createTables,
}
