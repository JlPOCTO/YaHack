const express = require('express');
const expressSession = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const sqlite3 = require('sqlite3');
const sqliteStore = require('express-session-sqlite');

const {routers} = require('./routes');
const {myPassport} = require('./myPassport');

const me = {
    id: 1,
    name: 'Иванов И И'
};

const students = [
    {
        idStudent: 2,
        idDialog: 1,
        name: 'Петров П П'
    },
    {
        idStudent: 3,
        idDialog: 2,
        name: 'やめてください'
    }
];

const dialogs = [
    {
        id: 1,
        messages: [{idFrom: 1, time: Date(2024, 1, 10, 10, 5, 20), message: "Hihhhhhhhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhh uuuuuuuuuu uuuuuuuu uuuuuuuuuu iiiiiiiiii uuuuuuuuu iiiiiiii uuuuuuuuu!"},
            {idFrom: 2, time: Date(2024, 1, 11, 12), message: "Yo"},
            {idFrom: 1, time: Date(2024, 2, 1), message: "Ohayo"},{idFrom: 2, time: Date(2024, 3, 1, 10, 7), message: "Here"},
            {idFrom: 2, time: Date(2024, 3, 1, 11), message: "아니요"},
            {idFrom: 3, time: Date(2024, 2, 1), message: "مداح"}]
    },
    {
        id: 2,
        messages: [{idFrom: 2, time: Date(2024, 3, 1, 10, 7), message: "Here"},
            {idFrom: 2, time: Date(2024, 3, 1, 11), message: "아니요"},
            {idFrom: 3, time: Date(2024, 2, 1), message: "مداح"}]
    }
]

const app = express()
app.use(cookieParser(process.env.EXPRESS_SESSION_SECRET))
app.use(bodyParser.json());
app.use(cors());

app.get('/dialogs', (req, res) => {
    res.send(dialogs);
});

app.get('/myInfo', (req, res) => {
    res.send(me);
});

app.get('/dialogs/:id/messages', (req, res) => {
    let a = req.params.id - 1
    res.send(dialogs[a].messages)
    // res.send(dialogs[0].messages)
});

app.get('/messages', (req, res) => {
    let a = req.query.id - 1
    res.send(dialogs[a].messages)
    // res.send(dialogs[0].messages)
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
