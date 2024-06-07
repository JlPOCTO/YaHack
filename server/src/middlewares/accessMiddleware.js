const chats = require('../database/dbChats')
const users = require('../database/dbUsers')

function accessSomething(field, func, ...extractors) {
    return async (req, res, next) => {
        const values = extractors.map(extractor => extractor(req))
        const entry = await func(...values)
        if (entry === undefined) {
            res.status(500).send()
        } else {
            req[field] = entry
            next()
        }
    }
}

function accessChat(chatIdExtractor) {
    return accessSomething("chat", chats.getChat, chatIdExtractor)
}

function accessContacts(userIdExtractor) {
    return accessSomething("contacts", users.getContacts, userIdExtractor)
}

function accessChatByMessage(messageIdExtractor) {
    return accessSomething("chat", chats.getChatByMessageId, messageIdExtractor)
}

module.exports = {accessChat, accessContacts, accessChatByMessage}
