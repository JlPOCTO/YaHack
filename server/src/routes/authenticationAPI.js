const express = require('express');
const passport = require('passport');
const {getBasePage} = require("./statics/getBasePage");

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
