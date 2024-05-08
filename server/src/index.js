require('dotenv').config();
require('./utilities/checkEnv')()
const express = require('express');
const expressSession = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3')
const sqliteStoreFactory = require('express-session-sqlite');
const sqliteStore = sqliteStoreFactory.default(expressSession);
const { routers } = require('./routes');
const { myPassport } = require('./myPassport');
const { launchDB, closeDB } = require("./database/launchDB");
const users = require('./database/dbUsers');
const chats = require('./database/dbChats');

(async () => {
    await launchDB(process.env.DATABASE)
    const app = express()
    app.use(cookieParser(process.env.EXPRESS_SESSION_SECRET))
    app.use(bodyParser.json());
    app.use(cors());

    app.get('/dialogs', async (req, res) => {
        //currentUser to be added 
        res.send(await chats.getChatsByUser(1));
    });

    app.get('/me', async (req, res) => {
        //currentUser to be added
        res.send(await users.findUserByID(1));
    });
    app.get('/contacts', async (req, res) => {
        //currentUser to be added
        res.send(await users.findAllUsers());
    });
    app.get('/dialogs/:id/messages', async (req, res) => {
        let a = req.query.id
        res.send(await chats.getMessagesFromChat(a))
    });

    app.get('/messages', async (req, res) => {
        let a = req.query.id
        res.send(await chats.getMessagesFromChat(a))
    });

    // app.post('/addMessage', async(req, res) => {
    //     const dialogID = req.body.dialogID;
    //     chats.addMessage(req.body.message)
    // })
    app.use(express.static('../client/build/assets'));
    app.use(express.static('../client/static'))
    app.use(expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new sqliteStore({
            driver: sqlite3.Database,
            path: process.env.DATABASE,
            ttl: 604800000
        })
    }));
    app.use(myPassport.initialize());
    app.use(myPassport.session({}));
    app.use(routers);
    app.listen(process.env.PORT);
})();

process.on('exit', async () => {
    await closeDB();
});
process.on('SIGINT', async () => {
    await closeDB();
});
