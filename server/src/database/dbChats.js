const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function getMessages(db, userID1, userID2) {
	const ID1 = Math.min(userID1, userID2);
	const ID2 = Math.max(userID1, userID2);

	const res = await db.get("SELECT messages FROM MessageDB WHERE id1=" + ID1 + " AND id2=" + ID2);
	if (res === undefined) return [];
	return res['messages'].split("$&%");
}

async function addChat(db, userID1, userID2) {
	const ID1 = Math.min(userID1, userID2);
	const ID2 = Math.max(userID1, userID2);

	const res = await db.get("SELECT * FROM MessageDB WHERE id1 = " + ID1 + " AND id2 = " + ID2);
	if (res === undefined) {
		await db.exec("INSERT INTO MessageDB VALUES (" + ID1 + "," + ID2 + ",\"\")");
	}
}

async function addMessage(db, userIDFrom, userIDTo, message) {
	const ID1 = Math.min(userIDFrom, userIDTo);
	const ID2 = Math.max(userIDFrom, userIDTo);

	await addChat(db, userIDFrom, userIDTo);

	const row = await db.get("SELECT messages FROM MessageDB WHERE id1=" + ID1 + " AND id2=" + ID2,
		(err, row) => {
			if (err) {
				return "ERROR";
			}
			return row;
		});
	if (row != "ERROR") {
		if (row['messages'] == "") {
			await db.exec("UPDATE MessageDB SET messages = \"" + userIDFrom + ":" + message +
				"\" WHERE id1 = " + ID1 + " AND id2 = " + ID2);
		} else {
			await db.exec("UPDATE MessageDB SET messages = \"" + row['messages'] + "$&%" + userIDFrom + ":" + message +
				"\" WHERE id1 = " + ID1 + " AND id2 = " + ID2);
		}
	}
}

module.exports = {
	getMessages,
	addMessage,
}