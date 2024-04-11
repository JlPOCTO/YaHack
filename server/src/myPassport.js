const myPassport = require('passport');
const {githubStrategy} = require('./strategies/github');

myPassport.use(githubStrategy);

myPassport.serializeUser((profile, done) => {
    // TODO Сохранение данных юзера в сессии
    done(null, profile);
});

myPassport.deserializeUser((profile, done) => {
    // TODO Загрузка данных юзера из сессии
    done(null, profile);
});

module.exports = {myPassport};
