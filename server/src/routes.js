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
        res.send(dbChats.getChats(db, req.query.chatID));
    }
);

routers.post(
    version + '/createChat',
    (req, res) => {
        res.send(dbChats.addChat(db, [req.query.userIDs], req.query.chatType, req.query.chatName));
    }
);

routers.get(
    version + '/myInfo',
    (req, res) => {
        res.send(dbUsers.findByID(db, req.query.userID));
    }
);

routers.get(
    version + '/messages',
    (req, res) => {
        const dialogID = req.query.dialogID;
        res.send(dbChats.getMessages(db, dialogID));
    }
);

routers.post(
    version + '/addMessage',
    (req, res) => {
        const dialogID = req.query.dialogID;
        const fromID = req.query.fromID;
        const message = req.query.messageText;
        const time = req.query.messageTime;
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
