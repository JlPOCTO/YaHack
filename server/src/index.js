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
const fileUpload = require('express-fileupload');
const {myPassport} = require('./myPassport');
const {launchDB} = require("./database/launchDB");
const {initClient} = require('./database/images');
initClient();
const {authRouter} = require('./routes/authenticationAPI');
const {chatsRouter} = require('./routes/chatsAPI');
const {usersRouter} = require('./routes/usersAPI');
const {messagesRouter} = require('./routes/messagesAPI');
const {deprecatedRouter} = require('./routes/deprecated');

(async () => {
    await launchDB(process.env.DATABASE)
    const app = express()
    app.use(cookieParser(process.env.EXPRESS_SESSION_SECRET))
    app.use(bodyParser.json());
    app.use(cors());
    app.use(fileUpload());
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
    app.use(authRouter);
    app.use(chatsRouter);
    app.use(usersRouter);
    app.use(messagesRouter);
    app.use(deprecatedRouter);
    app.listen(process.env.PORT);
})();
