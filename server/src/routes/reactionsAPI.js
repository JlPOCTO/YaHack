const express = require('express');
const reactions = require('../database/dbReactions');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const validate = require("../middlewares/validationMiddleware")

const routers = express.Router();


routers.get(
    '/api/v2/reactions/:id',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    (req, res) => {
        reactions.getReaction(req.params.id).then(
            async reaction => {
                res.send(reaction)
            }
        )
    }
)

routers.delete(
    '/api/v2/reactions/:id',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isReactionOwned(x => x.params.id, x.user.id),
    validate.isChatAccessible(x => x.body.chatId, x => x.user.id),
    accessChat(x => x.body.chatId),
    (req, res) => {
        reactions.deleteReactionById(req.body.reaction).then(
            result => {
                if (result) {
                    websockets.sendByUserArray(
                        req.chat.users,
                        websockets.createResponse(
                            "/api/v2/reactions/:id",
                            "DELETE",
                            "/api/v2/reactions",
                            {reactionId: req.params.id}
                        ),
                        req.user.id
                    )
                    res.status(200).send()
                } else {
                    res.status(500).send()
                }
            }
        )
    }
)

routers.post(
    '/api/v2/reactions',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isChatAccessible(x => x.body.chatId, x => x.user.id),
    accessChat(x => x.body.chatId),
    (req, res) => {
        reactions.addReaction(req.params.id, req.user.id, req.body.reaction).then(
            result => {
                if (result) {
                    websockets.sendByUserArray(
                        req.chat.users,
                        websockets.createResponse(
                            "/api/v2/reactions",
                            "POST",
                            "/api/v2/reactions/:id",
                            {reactionId: result.id}
                        ),
                        req.user.id
                    )
                    res.status(200).send()
                } else {
                    res.status(500).send()
                }
            }
        )
    }
)


module.exports = {reactionsRouter: routers}

