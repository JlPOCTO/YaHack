const usualChecks = require('../utilities/validationFunctions')
const databaseChecks = require("../database/dbChecks");
const {getContacts} = require("../database/dbUsers");

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

function isCorrectImage(extractor) {
    return usualCheckTemplate(usualChecks.checkImage, extractor)
}

function isCorrectFile(extractor) {
    return usualCheckTemplate(usualChecks.checkFile, extractor)
}

function isCorrectMessageRequest(extractor) {
    return usualCheckTemplate(usualChecks.checkMessageRequest, extractor)
}

function isMessageExists(extractor) {
    return databaseUnaryCheckTemplate(databaseChecks.isMessageExists, extractor, 404)
}

function doesMessageHaveFile(extractor) {
    return databaseUnaryCheckTemplate(databaseChecks.doesMessageHaveFile, extractor, 404)
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

function isReactionOwned(reactionExtractor, userExtractor) {
    return databaseBinaryCheckTemplate(databaseChecks.isReactionFromUser, reactionExtractor, userExtractor, 403)
}

function isChatAccessible(chatExtractor, userExtractor) {
    return databaseBinaryCheckTemplate(databaseChecks.isUserInChat, chatExtractor, userExtractor, 403)
}

function isChatNotAccessible(chatExtractor, userExtractor) {
    return databaseBinaryCheckTemplate(inverseAwait(databaseChecks.isUserInChat), chatExtractor, userExtractor, 403)
}

const chatRequestMiddleware = async (req, res, next) => {
    if (!usualChecks.checkChatRequest(req.body)) {
        res.sendStatus(400)
        return
    }
    let contacts = await getContacts(req.user.id)
    if (contacts === undefined) {
        res.sendStatus(500)
    }
    contacts = contacts.map(x => x.id)
    if (req.body.chatType === "direct") {
        for (let userId of req.body.users) {
            if (contacts.includes(userId)) {
                res.sendStatus(403)
                return
            }
        }
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
    isCorrectImage,
    isCorrectFile,
    chatRequestMiddleware,
    isCorrectMessageRequest,
    isUserExists,
    isUserExistsByLogin,
    isMessageExists,
    doesMessageHaveFile,
    isChatExists,
    isReactionExists,
    isChatChangeable,
    isMessageAccessible,
    isMessageOwned,
    isReactionOwned,
    isChatAccessible,
    isChatNotAccessible
}
