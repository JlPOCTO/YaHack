const express = require('express');
const messages = require('../database/dbMessages');
const reactions = require('../database/dbReactions');
const images = require('../database/images');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const validate = require("../middlewares/validationMiddleware")
const {wrapWithNext} = require("../middlewares/wrapWithNext");
const uuid = require('uuid');
const {prepareMessage} = require("../utilities/converters");

const routers = express.Router();

routers.get(
    '/api/v2/messages/:id',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isMessageExists(x => x.params.id),
    validate.isMessageAccessible(x => x.params.id, x => x.user.id),
    (req, res) => {
        messages.getMessage(req.params.id).then(
            result => {
                if (result !== undefined) {
                    res.send(prepareMessage(result))
                } else {
                    res.status(500).send()
                }
            }
        )
    }
)

routers.delete(
    '/api/v2/messages/:id',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isMessageExists(x => x.params.id),
    validate.isMessageOwned(x => x.params.id, x => x.user.id),
    async (req, res) => {
        messages.deleteMessage(req.params.id).then(
            result => {
                if (result) {
                    res.send()
                } else {
                    res.status(500).send()
                }
            }
        )
    }
)

routers.post(
    '/api/v2/messages',
    isAuthenticatedAPI,
    validate.isCorrectMessageRequest(x => x.body),
    validate.isChatExists(x => x.body.chatId),
    validate.isChatAccessible(x => x.body.chatId, x => x.user.id),
    async (req, res) => {
        let name = ""
        if (req.body.imageContent) {
            name = "message_" + uuid.v4() + ".png"
            if (!await images.uploadImage(name, req.body.imageContent)) {
                res.status(500).send()
                return
            }
        }
        messages.addMessage(req.user.id, req.body.chatId, req.body.content, name, Date.now()).then(
            result => {
                if (result) {
                    res.send(result)
                } else {
                    res.status(500).send()
                }
            }
        )
    }
)

routers.get(
    '/api/v2/messages/:id/image',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isMessageExists(x => x.params.id),
    validate.isMessageAccessible(x => x.params.id, x => x.user.id),
    (req, res) => {
        messages.getMessage(req.params.id).then(
            async message => {
                const data = await images.getImage(message.imageContent)
                if (data === undefined) {
                    res.status(500).send()
                } else {
                    res.send(data)
                }
            }
        )
    }
)

routers.get(
    '/api/v2/messages/:id/reactions',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isMessageExists(x => x.params.id),
    validate.isMessageAccessible(x => x.params.id, x => x.user.id),
    (req, res) => {
        messages.getMessage(req.params.id).then(
            async message => {
                res.send(message.reactions)
            }
        )
    }
)

routers.post(
    '/api/v2/messages/:id/reactions',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isMessageExists(x => x.params.id),
    validate.isMessageAccessible(x => x.params.id, x => x.user.id),
    (req, res) => {
        reactions.addReaction(req.params.id, req.user.id, req.body.reaction).then(
            res.send(200)
        )
    }
)

routers.delete(
    '/api/v2/messages/:id/reactions',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isMessageExists(x => x.params.id),
    validate.isMessageAccessible(x => x.params.id, x => x.user.id),
    (req, res) => {
        maybeId = req.body.reaction
        if (maybeId && Number.isInteger(maybeId) && Number(maybeId) > 0) {
            reactions.deleteReactionById(req.body.reaction).then(
                res.send(200)
            )
        } else {
            reactions.deleteReaction(req.params.id, req.user.id, req.body.reaction).then(
                res.send(200)
            )
        }
    }
)

module.exports = {messagesRouter: routers}
