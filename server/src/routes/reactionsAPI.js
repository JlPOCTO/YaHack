const express = require('express');
const reactions = require('../database/dbReactions');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const validate = require("../middlewares/validationMiddleware")
const accessor = require("../middlewares/accessMiddleware")
const {wrapWithNext} = require("../middlewares/wrapWithNext");
const websockets = require("../routes/websockets")

const routers = express.Router();

routers.get(
    '/api/v2/reactions/:id',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isReactionExists(x => x.params.id),
    accessor.accessReaction(x => x.params.id),
    accessor.accessMessageByReaction(x => x.params.id),
    validate.isMessageAccessible(x => x.message.id, x => x.user.id),
    (req, res) => {
        res.send(req.reaction)
    }
)

routers.delete(
    '/api/v2/reactions/:id',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isReactionExists(x => x.params.id),
    validate.isReactionOwned(x => x.params.id, x => x.user.id),
    accessor.accessReaction(x => x.params.id),
    accessor.accessChatByReaction(x => x.params.id),
    (req, res) => {
        reactions.deleteReactionById(req.params.id).then(
            result => {
                if (result) {
                    websockets.sendByUserArray(
                        req.chat.users,
                        websockets.createResponse(
                            "/api/v2/reactions/:id",
                            "DELETE",
                            undefined,
                            {reactionId: req.params.id}
                        ),
                        req.user.id
                    )
                    res.send()
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
    wrapWithNext(x => x.body.messageId = Number.parseInt(x.body.messageId)),
    validate.isCorrectId(x => x.body.messageId),
    validate.isMessageExists(x => x.body.messageId),
    accessor.accessChatByMessage(x => x.body.messageId),
    (req, res) => {
        reactions.addReaction(req.body.messageId, req.user.id, req.body.reaction).then(
            reaction => {
                if (reaction) {
                    websockets.sendByUserArray(
                        req.chat.users,
                        websockets.createResponse(
                            "/api/v2/reactions",
                            "POST",
                            "/api/v2/reactions/:id",
                            {reactionId: reaction.id}
                        ),
                        req.user.id
                    )
                    res.send()
                } else {
                    res.status(500).send()
                }
            }
        )
    }
)

module.exports = {reactionsRouter: routers}
