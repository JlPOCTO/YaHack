const express = require('express');
const passport = require('passport');
const {getBasePage} = require("./statics/getBasePage");
const { isAuthenticatedMiddleware } = require("./middlewares/isAuthenticatedMiddleware")
const dbChats = require('./database/dbChats');
const dbUsers = require('./database/dbUsers');
const { db } = require('./database/db');

const routers = express.Router();

const version = '/api/v1';
    
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
    '/logout',
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
    version + '/dialogs',
    (req, res) => {
        res.send(dbChats.getChats(db, req.body.chatID));
    }
);

routers.post(
    version + '/createChat',
    (req, res) => {
        res.send(dbChats.addChat(db, [req.body.userIDs], req.body.chatType, req.body.chatName));
    }
);

routers.get(
    version + '/myInfo',
    (req, res) => {
        res.send(dbUsers.findByID(db, req.body.userID));
    }
);

routers.get(
    version + '/messages',
    (req, res) => {
    const dialogID = req.body.dialogID;
        res.send(dbChats.getMessages(db, dialogID));
    }
);

routers.post(
    version + '/addMessage',
    (req, res) => {
        const dialogID = req.body.dialogID;
        const fromID = req.body.fromID;
        const message = req.body.messageText;
        const time = req.body.messageTime;
        const IMGPath = ""; //TODO IMG
        dbChats.addMessage(db, dialogID, fromID, message, time, IMGPath);
    }
)

routers.get(
    '*',
    isAuthenticatedMiddleware,
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage()));
    }
);

module.exports = {routers}
