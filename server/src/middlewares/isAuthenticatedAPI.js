const {getUserById} = require("../database/dbUsers");
const isAuthenticatedAPI = async (req, res, next) => {
    if (process.env.MODE === "TEST") {
        req.user = await getUserById(1)
        return next()
    }
    if (!req.isAuthenticated()) {
        return res.status(401).send();
    }
    next();
}

module.exports = {isAuthenticatedAPI};
