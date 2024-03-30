const express = require('express');
const passport = require('passport');
const {isAuthenticatedMiddleware} = require('./middlewares/isAuthenticatedMiddleware');
const {generateHTML} = require("./generateHTML");

const routers = express.Router();




// TODO Отрисовка главной страницы
// res.render('home', { user: req.user })
routers.get(
    '/',
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(generateHTML()));
    }
);

routers.get(
    '/auth/github',
    passport.authenticate('github')
);

// Маршрут, на который пользователь будет возвращён после авторизации на GitHub
routers.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

// TODO Профиль пользователя
// routers.get(
//     '/profile',
//     // Если пользователь не аутентифицирован, то отправляем на /
//     isAuthenticatedMiddleware,
//     // Иначе показываем его профиль
//     (req, res) => res.render('user', { user: req.user })
// );

// TODO Выход пользователя
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

module.exports = { routers }