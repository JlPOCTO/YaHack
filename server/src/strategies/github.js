const passportGithub = require('passport-github');
const {addUser} = require('../database/dbUsers');

const githubStrategy = new passportGithub.Strategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.LINK}:${process.env.PORT}/auth/github/callback`
    },
    (accessToken, refreshToken, profile, done) => {
        addUser(profile.id, profile.displayName, profile.username).then(done(null, profile.id))
    }
);

module.exports = {githubStrategy}
