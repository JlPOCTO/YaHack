const passportGithub = require('passport-github');
const {addUser} = require('../database/dbUsers');
const {createAvatar} = require('../utilities/avatars');
const images = require('../database/images');

const githubStrategy = new passportGithub.Strategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://${process.env.LINK}:${process.env.PORT}/auth/github/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
        const avatar = createAvatar();
        const key = "user_" + profile.id;
        await images.uploadImage(key, avatar, key + ".png", "image/png");
        const name = profile.displayName ? profile.displayName : profile.username;
        addUser(profile.id, name, profile.username, key).then(done(null, profile.id));
    }
);

module.exports = {githubStrategy}
