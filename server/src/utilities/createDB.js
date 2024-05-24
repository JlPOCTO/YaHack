const sqlite3 = require("sqlite3");
const {open} = require("sqlite");

function makeTable(name, param) {
    return {name: name, params: param}
}

const TABLES = [
    makeTable("messages", `(
        id INTEGER PRIMARY KEY,
        chat_id INTEGER,
        sender_id INTEGER,
        message TEXT,
        time INTEGER,
        image_path TEXT,
        FOREIGN KEY(chat_id) REFERENCES chats(id))`),
    makeTable("users_in_chats", `(
        chat_id INTEGER,
        user_id INTEGER,
        PRIMARY KEY (chat_id, user_id),
        FOREIGN KEY(chat_id) REFERENCES chats(id),
        FOREIGN KEY(user_id) REFERENCES users(id))`),
    makeTable("chats", `(
        id INTEGER PRIMARY KEY,
        name TEXT,
        avatar_path TEXT,
        type TEXT CHECK (type IN ('direct', 'group')))`),
    makeTable("users", `(
        id INTEGER PRIMARY KEY,
        name TEXT,
        login TEXT,
        avatar_path TEXT)`),
    makeTable("reactions", `(
        id INTEGER PRIMARY KEY,
        message_id INTEGER,
        user_id INTEGER,
        reaction TEXT,
        FOREIGN KEY(message_id) REFERENCES messages(id),
        FOREIGN KEY(user_id) REFERENCES users(id))`),
    makeTable("invite_links", `(
        id INTEGER PRIMARY KEY,
        chat_id INTEGER,
        creator_id INTEGER,
        FOREIGN KEY(chat_id) REFERENCES chats(id),
        FOREIGN KEY(creator_id) REFERENCES users(id))`)
];

(async () => {
    const database = await open({
        filename: process.argv[2], driver: sqlite3.Database
    });
    await database.run(`PRAGMA foreign_keys = ON`);
    await Promise.all(TABLES.map(table =>
        database.run(`CREATE TABLE IF NOT EXISTS ${table.name} ${table.params} STRICT`)
    ));
    await database.close();
})();
