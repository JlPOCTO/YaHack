const usualChecks = require('../utilities/validationFunctions')
const databaseChecks = require("../database/dbChecks");

function usualCheckTemplate(checker, extractor) {
    return (req, res, next) => {
        if (checker(extractor(req))) {
            next()
        } else {
            res.status(400).send()
        }
    }
}

function databaseUnaryCheckTemplate(accessor, extractor, code) {
    return async (req, res, next) => {
        const check = await accessor(extractor(req))
        if (check === undefined) {
            res.status(500).send()
        } else if (check === false) {
            res.status(code).send()
        } else {
            next()
        }
    }
}

function databaseBinaryCheckTemplate(checker, firstExtractor, secondExtractor, code) {
    return async (req, res, next) => {
        const check = await checker(firstExtractor(req), secondExtractor(req))
        if (check === undefined) {
            res.sendStatus(500)
        } else if (check === false) {
            res.sendStatus(code)
        } else {
            next()
        }
    }
}

function inverseAwait(func) {
    return async function inverse() {
        const check = await func(...arguments)
        if (check === false) {
            return true
        } else if (check === true) {
            return false
        }
    }
}

function isCorrectId(extractor) {
    return usualCheckTemplate(usualChecks.checkId, extractor)
}

function isCorrectLogin(extractor) {
    return usualCheckTemplate(usualChecks.checkLogin, extractor)
}

function isCorrectMessageRequest(extractor) {
    return usualCheckTemplate(usualChecks.checkMessageRequest, extractor)
}

function isMessageExists(extractor) {
    return databaseUnaryCheckTemplate(databaseChecks.isMessageExists, extractor, 404)
}

function isChatExists(extractor) {
    return databaseUnaryCheckTemplate(databaseChecks.isChatExists, extractor, 404)
}

function isUserExists(extractor) {
    return databaseUnaryCheckTemplate(databaseChecks.isUserExists, extractor, 404)
}

function isUserExistsByLogin(extractor) {
    return databaseUnaryCheckTemplate(databaseChecks.isUserExistsByLogin, extractor, 404)
}

function isReactionExists(extractor) {
    return databaseUnaryCheckTemplate(databaseChecks.isReactionExists, extractor, 404)
}

function isChatChangeable(extractor) {
    return databaseUnaryCheckTemplate(databaseChecks.isChatChangeable, extractor, 403)
}

function isMessageAccessible(messageExtractor, userExtractor) {
    return databaseBinaryCheckTemplate(databaseChecks.isMessageAccessible, messageExtractor, userExtractor, 403)
}

function isMessageOwned(messageExtractor, userExtractor) {
    return databaseBinaryCheckTemplate(databaseChecks.isMessageFromUser, messageExtractor, userExtractor, 403)
}

function isChatAccessible(chatExtractor, userExtractor) {
    return databaseBinaryCheckTemplate(databaseChecks.isUserInChat, chatExtractor, userExtractor, 403)
}

function isChatNotAccessible(chatExtractor, userExtractor) {
    return databaseBinaryCheckTemplate(inverseAwait(databaseChecks.isUserInChat), chatExtractor, userExtractor, 403)
}

const chatRequestMiddleware = async (req, res, next) => {
    if (!usualChecks.checkChatRequest(req.body)) {
        res.status(400).send()
        return
    }
    if (!req.body.users.includes(req.user.id)) {
        res.sendStatus(403)
        return
    }
    const exists = await Promise.all(req.body.users.map(
        async userId => await databaseChecks.isUserExists(userId)
    ))
    for (const ex of exists) {
        if (ex === undefined) {
            res.sendStatus(500)
            return
        }
        if (ex === false) {
            res.sendStatus(404)
            return
        }
    }
    next()
}

module.exports = {
    isCorrectId,
    isCorrectLogin,
    chatRequestMiddleware,
    isCorrectMessageRequest,
    isUserExists,
    isUserExistsByLogin,
    isMessageExists,
    isChatExists,
    isReactionExists,
    isChatChangeable,
    isMessageAccessible,
    isMessageOwned,
    isChatAccessible,
    isChatNotAccessible
}
