const express = require('express');
const passport = require('passport');
const {getBasePage} = require("./statics/getBasePage");
const {isAuthenticatedMiddleware} = require("./middlewares/isAuthenticatedMiddleware")

const routers = express.Router();

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
    '*',
    isAuthenticatedMiddleware,
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage()));
    }
);

routers.get(
    '/dialogs',
    (req, res) => {
        res.send(dbChats.getChats(chats, req.body.id));
    }
);

routers.post(
    '/createDialog',
    (req, res) => {
        dbChats.addChat(chats, [req.body.idFirst, req.body.idSecond]);
    }
);

routers.post(
    '/createChat',
    (req, res) => {
        dbChats.addChat(chats, [req.body.idFirst], req.body.chatName);
    }
);

routers.get(
    '/myInfo',
    (req, res) => {
     res.send(dbUsers.findByID(users, req.body.id));
    }
);

routers.get(
    '/messages',
    (req, res) => {
    const dialogID = req.body.dialogID;
        res.send(dbChats.getMessages(chats, dialogID));
    }
);

routers.post(
    '/addMessage',
    (req, res) => {
        const dialogID = req.body.dialogID;
        const fromID = req.body.fromID;
        const message = req.body.message;
        const time = req.body.time;
        dbChats.addMessage(chats, dialogID, fromID, message, time);
    }
)

module.exports = {routers}
