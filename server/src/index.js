(async () => {
    const express = require('express');
    const expressSession = require('express-session');
    const cookieParser = require("cookie-parser");
    const cors = require('cors');
    const bodyParser = require('body-parser');
    require('dotenv').config();

    const { db } = require('./database/db');

    const sqliteStore = require('express-session-sqlite');

    const { routers } = require('./routes');
    const { myPassport } = require('./myPassport');

    

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
