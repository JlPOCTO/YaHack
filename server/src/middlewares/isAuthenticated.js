const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated() && process.env.MODE !== "TEST") {
        return res.redirect('/');
    }
    next();
}

module.exports = {isAuthenticated};
