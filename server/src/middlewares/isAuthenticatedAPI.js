const isAuthenticatedAPI = (req, res, next) => {
    if (process.env.MODE === "TEST") {
        req.user = {
            id: 78441661,
            name: "Danil Gavrilov",
            login: "gr33n-m1ner",
            avatarPath: "user_78441661.svg"
        }
        return next()
    }
    if (!req.isAuthenticated()) {
        return res.status(401).send();
    }
    next();
}

module.exports = {isAuthenticatedAPI};
