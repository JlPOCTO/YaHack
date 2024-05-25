const passportGithub = require('passport-github');
const {addUser} = require('../database/dbUsers');
const {createAvatar} = require('../utilities/createAvatar');
const images = require('../database/images');

const githubStrategy = new passportGithub.Strategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.LINK}:${process.env.PORT}/auth/github/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
        const avatar = await createAvatar();
        const avatarPath = profile.id + ".jpg";
        await images.uploadImage(avatarPath, avatar);
        addUser(profile.id, profile.displayName, profile.username, avatarPath).then(done(null, profile.id))
    }
);

module.exports = {githubStrategy}
