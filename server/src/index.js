// const cookieParser = require('cookie-parser');
const express = require('express');
const expressSession = require('express-session');
const cookieParser = require("cookie-parser");

require('dotenv').config()

const { routers } = require('./routes');
const { myPassport } = require('./myPassport');


const app = express();

app.use(express.static('../Client/build/static'));


// TODO Понять зачем и как
app.use(cookieParser());

// Подключаем библиотеку, чтобы управлять сессиями аутентифицированных пользователей.
app.use(expressSession({
    // TODO Осознать
    // Сессии содержат id сессии и данные пользователя
    // (или id пользователя, если данные хранятся в базе).
    //
    // Как только пользователь аутентифицируется, мы создаём его сессию с уникальным id.
    // кладём её в хранилище (по умолчанию, в память), связываем с данными пользователя.
    //
    // Затем подписываем сессию секретом и кладём в cookie `connect.sid`.
    //
    // При обновлении страницы, мы читаем cookie `connect.sid`,
    // получаем из неё id и смотрим, нет ли в хранилище существующей сессии.
    //
    // Если есть, то считаем пользователя уже аутентифицированным.

    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // TODO Понять что делать с сессиями. Что делать с хранилищем
    // store: new require('connect-mongo')(expressSession)(options)
}));

app.use(myPassport.initialize());

// TODO Понять что делать с сессиями
app.use(myPassport.session());

app.use(routers);

if (process.env.SERVER_PORT) {
    app.listen(process.env.SERVER_PORT);
} else {
    app.listen(3000);
}