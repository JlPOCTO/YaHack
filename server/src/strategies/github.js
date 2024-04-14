const passportGithub = require('passport-github');
const { addUser } = require('../database/dbUsers');
const { openDB } = require('../database/launchDB');

const githubStrategy = new passportGithub.Strategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.LINK}:${process.env.PORT}/auth/github/callback`
    },
    (accessToken, refreshToken, profile, done) => {
        // TODO Добавление в базу данных или обновление
        await addUser(openDB(), profile.id, profile.displayName, profile.username)
        done(null, profile)

        // TODO Возможно отмена: done(null, false)
    }
);

module.exports = {githubStrategy}
