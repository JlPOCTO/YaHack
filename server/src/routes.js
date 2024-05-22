const express = require('express');
const passport = require('passport');
const {getBasePage} = require("./statics/getBasePage");
const {isAuthenticated} = require("./middlewares/isAuthenticated");
const {isAuthenticatedAPI} = require("./middlewares/isAuthenticatedAPI");
const dbChats = require('./database/dbChats');
const dbUsers = require('./database/dbUsers');

const routers = express.Router();

const version = process.env.API_VERSION;

// Руты, связанные со страницами
routers.get(
    '/auth/github',
    passport.authenticate('github')
);

routers.get(
    '/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/home')
    }
);

routers.get(
    '/',
    (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect('/home');
        }
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage()));
    }
)

routers.get(
    '/logout',
    isAuthenticated,
    (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }
);

routers.get(
    '/home',
    isAuthenticated,
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage()));
    }
);

// Руты, связанные с API

routers.use(isAuthenticatedAPI);

routers.get(
    version + '/chats',
    (req, res) => {
        res.send(dbChats.getChats(req.query.userID));
    }
);

routers.post(
    version + '/chat',
    (req, res) => {
        dbChats.addChat(req.query.userIDs, req.query.chatType, req.query.chatName).then(
            result => res.send(result)
        )
    }
);

routers.get(
    version + '/myInfo',
    (req, res) => {
        res.send(req.user);
    }
);

routers.get(
    version + '/messages',
    (req, res) => {
        const chatID = req.query.chatID;
        res.send(dbChats.getMessages(chatID));
    }
);

routers.post(
    version + '/message',
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

// Рут по умолчанию (для неизвестных)
routers.get(
    '*',
    isAuthenticated,
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage())); //TODO Страница ошибки
    }
);

module.exports = {routers}
