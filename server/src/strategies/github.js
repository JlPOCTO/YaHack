const passportGithub = require('passport-github');

const githubStrategy = new passportGithub.Strategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://127.0.0.1:3000/auth/github/callback`
    },
    (accessToken, refreshToken, profile, done) => {
        // TODO Добавление в базу данных или обновление
        console.log("Authorization")

        done(null, profile)

        // TODO Возможно отмена: done(null, false)
    }
);

module.exports = { githubStrategy }
