const myPassport = require('passport');
const {githubStrategy} = require('./strategies/github');
const {findUserByID} = require('./database/dbUsers')

myPassport.use(githubStrategy);

myPassport.serializeUser((id, done) => {
    done(null, id);
});

myPassport.deserializeUser((id, done) => {
    findUserByID(id).then(user => {
        done(null, user);
    })
});

module.exports = {myPassport};
