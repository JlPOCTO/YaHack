const {database} = require("./launchDB");


async function addMessage(chatID, senderID, message, time, imagePath) {
    await database().run(`
        INSERT INTO messages(message, time, sender_id, chat_id, image_path)
	    VALUES ('${message}', ${time}, ${senderID}, ${chatID}, '${imagePath}');
    `);
}

module.exports = {
     addMessage
}
