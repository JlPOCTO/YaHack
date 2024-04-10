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
    passport.authenticate('github', {failureRedirect : '/'}),
    (req, res) => {
        res.redirect('/home')
    }
);

// TODO Выйти из профиля
// routers.get(
//     '/logout',
//     (req, res) => {
//         // Удаляем сессию пользователя из хранилища
//         req.logout(function(err) {
//             if (err) { return next(err); }
//             // И отправляем на /
//             res.redirect('/');
//         });
//     }
// );

routers.get(
    '*',
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage()));
    }
);

module.exports = { routers }