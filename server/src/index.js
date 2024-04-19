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
const {routers} = require('./routes');
const {myPassport} = require('./myPassport');
const {launchDB, database} = require("./database/launchDB");
const chats = require("./database/dbChats");

(async () => {
    const app = express()
    await launchDB()
    app.use(cookieParser(process.env.EXPRESS_SESSION_SECRET))
    app.use(bodyParser.json());
    app.use(cors());
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
