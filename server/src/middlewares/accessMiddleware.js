const chats = require('../database/dbChats')
const users = require('../database/dbUsers')
const messages = require('../database/dbMessages')
const reactions = require('../database/dbReactions')

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

function accessMessage(messageIdExtractor) {
    return accessSomething("message", messages.getMessage, messageIdExtractor)
}

function accessMessageByReaction(reactionIdExtractor) {
    return accessSomething("message", messages.getMessageByReactionId, reactionIdExtractor)
}

function accessChatByReaction(reactionIdExtractor) {
    return accessSomething("chat", chats.getChatByReactionId, reactionIdExtractor)
}

function accessReaction(reactionIdExtractor) {
    return accessSomething("reaction", reactions.getReaction, reactionIdExtractor)
}

module.exports = {
    accessContacts,
    accessChat,
    accessChatByMessage,
    accessChatByReaction,
    accessMessage,
    accessMessageByReaction,
    accessReaction,
}
