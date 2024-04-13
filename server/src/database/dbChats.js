const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const dbCreare = require('./dbCreate');

//MessageDB - ��������� ���� ���������
//�������: chatID, fromID, message, time
//ChatsUsersDB - ��������� ��� ������������-���
//�������: userID, chatID
//ChatsDB - ��������� �����
//�������: chatID (autoincrement), name
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

async function createTables() {
	dbCreare.checkDB("./DB/Chats.db", "MessageDB", "(\
		chatID INTEGER,\
		fromID INTEGER,\
		message TEXT,\
		time DATE,\
		FOREIGN KEY(chatID) REFERENCES ChatsDB(chatID)\
		);");
	dbCreare.checkDB("./DB/Chats.db", "ChatsUsersDB", "(\
		chatID INTEGER,\
		userID INTEGER,\
		PRIMARY KEY (chatID, userID),\
		FOREIGN KEY(chatID) REFERENCES ChatsDB(chatID)\
		);");
	dbCreare.checkDB("./DB/Chats.db", "ChatsDB", "(\
		chatID INTEGER PRIMARY KEY,\
		name TEXT\
		);");
}

module.exports = {
	getChats,
	getMessages,
	addChat,
	addMessage,
	createTables,
}