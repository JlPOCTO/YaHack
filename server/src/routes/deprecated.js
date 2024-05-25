const express = require('express');
const chats = require('./database/dbChats');
const users = require('./database/dbUsers');
const messages = require("./database/dbMessages");
const {isAuthenticated} = require("./middlewares/isAuthenticated");
const {isAuthenticatedAPI} = require("./middlewares/isAuthenticatedAPI");

const oldV1Router = express.Router();

const version = process.env.API_VERSION;

// Рут по умолчанию (для неизвестных)
oldV1Router.get(
    '*',
    isAuthenticated,
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage())); //TODO Страница ошибки
    }
);

//v1
oldV1Router.get(
    version + '/chats',
    isAuthenticatedAPI,
    (req, res) => {
        res.send(dbChats.getChats(req.query.userID));
    }
);

oldV1Router.post(
    version + '/chat',
    isAuthenticatedAPI,
    (req, res) => {
        dbChats.addChat(req.query.userIDs, req.query.chatType, req.query.chatName).then(
            result => res.send(result)
        )
    }
);

oldV1Router.get(
    version + '/myInfo',
    isAuthenticatedAPI,
    (req, res) => {
        res.send(req.user);
    }
);

oldV1Router.get(
    version + '/messages',
    isAuthenticatedAPI,
    (req, res) => {
        const chatID = req.query.chatID;
        res.send(dbChats.getMessages(chatID));
    }
);

oldV1Router.post(
    version + '/message',
    isAuthenticatedAPI,
    (req, res) => {
        const chatID = req.query.chatID;
        const fromID = req.query.fromID;
        const message = req.query.messageText;
        const time = req.query.messageTime;
        const IMGPath = ""; //TODO IMG
        dbChats.addMessage(chatID, fromID, message, time, IMGPath).then(_ => {
            res.status(200)
        });
    }
)
// end v1
