function wrapWithNext(func) {
    return (req, res, next) => {
        func(req)
        next()
    }
}

module.exports = {wrapWithNext}
