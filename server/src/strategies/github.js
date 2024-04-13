const passportGithub = require('passport-github');
const dbUsers = require('../database/dbUsers');
const { db } = require('../database/db');

const githubStrategy = new passportGithub.Strategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.LINK}:${process.env.PORT}/auth/github/callback`
    },
    (accessToken, refreshToken, profile, done) => {
        // TODO Добавление в базу данных или обновление
        dbUsers.addUser(db, profile.id, profile.displayName, profile.username)
        done(null, profile)

        // TODO Возможно отмена: done(null, false)
    }
);

module.exports = {githubStrategy}
