// const cookieParser = require('cookie-parser');
const express = require('express');
const expressSession = require('express-session');
require('dotenv').config()

const { routers } = require('./routes');
const { myPassport } = require('./myPassport');

const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

const me = {
    id: 1,
    name: 'Иванов И И'
};

const students = [
    {
        id: 2,
        name: 'Петров П П'
    },
    {
        id: 3,
        name: 'やめてください'
    }
];

const studentDialogs = [1, 2]

const dialogs = [
    {
        id: 1,
        messages: [{ idFrom: 1, time: Date(2024, 1, 10, 10, 5, 20), message: "Hi!" },
            { idFrom: 2, time: Date(2024, 1, 11, 12), message: "Yo" },
            { idFrom: 1, time: Date(2024, 2, 1), message: "Ohayo" }]
    },
    {
        id: 2,
        messages: [{ idFrom: 2, time: Date(2024, 3, 1, 10, 7), message: "Here" },
            { idFrom: 2, time: Date(2024, 3, 1, 11), message: "아니요" },
            { idFrom: 3, time: Date(2024, 2, 1), message: "مداح" }]
    }
]

app.use(bodyParser.json());
app.use(cors());

app.get('/dialogs', (req, res) => {
    res.send(students);
});

app.get('/myInfo', (req, res) => {
    res.send(me);
});

app.get('/messages', (req, res) => {
    const dialogID = req.body.dialogID;
    for (let dialog in dialogs) {
        if (dialog.id == dialogID) {
            res.send(dialog)
            break;
        }
    }
});

app.post('/addMessage', (req, res) => {
    const dialogID = req.body.dialogID;
    for (let dialog in dialogs) {
        if (dialog.id == dialogID) {
            dialog.messages.push(req.body.message);
            res.send(dialog)
            break;
        }
    }
})

app.use(express.static('../Client/build/static'));

// app.set('view engine', 'hbs');
// app.set('views', './src/views');

// TODO Понять зачем и как
// // Подключаем библиотеку для парсинга кук, чтобы получить доступ к сессионной куке
// app.use(cookieParser());

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
    // TODO Понять что делать с сессиями
    resave: false,
    // TODO Понять что делать с сессиями
    saveUninitialized: false,
    // TODO Понять что делать с сессиями. Что делать с хранилищем
    // store: new require('connect-mongo')(expressSession)(options)
}));

app.use(myPassport.initialize());

// TODO Понять что делать с сессиями
app.use(myPassport.session());

app.use(routers);

app.listen(3000);