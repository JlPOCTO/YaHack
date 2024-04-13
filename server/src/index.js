(async () => {
    const express = require('express');
    const expressSession = require('express-session');
    const cookieParser = require("cookie-parser");
    const cors = require('cors');
    const bodyParser = require('body-parser');
    require('dotenv').config()

    const sqlite3 = require('sqlite3');
    const sqlite = require('sqlite');
    const sqliteStore = require('express-session-sqlite');

    const { routers } = require('./routes');
    const { myPassport } = require('./myPassport');

    users = await sqlite.open({
        filename: "./DB/Users.db",
        driver: sqlite3.Database
    });
    chats = await sqlite.open({
        filename: "./DB/Chats.db",
        driver: sqlite3.Database
    });

    const app = express()
    app.use(cookieParser(process.env.EXPRESS_SESSION_SECRET))
    app.use(bodyParser.json());
    app.use(cors());

    app.use(express.static('../client/build/assets'));
    app.use(express.static('../client/static'))

    app.use(expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // store: new sqliteStore({
        //
        // })
    }));

    app.use(myPassport.initialize());
    app.use(myPassport.session({}));
    app.use(routers);
    app.listen(process.env.PORT);
})();