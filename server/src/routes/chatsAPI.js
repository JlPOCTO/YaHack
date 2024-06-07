const express = require('express');
const chats = require('../database/dbChats');
const messages = require('../database/dbMessages');
const images = require('../database/images');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const validate = require('../middlewares/validationMiddleware');
const {accessChat} = require('../middlewares/accessMiddleware')
const uuid = require('uuid');
const {createAvatar} = require("../utilities/avatars");
const {prepareChat, prepareMessage} = require("../utilities/converters");
const {wrapWithNext} = require("../middlewares/wrapWithNext");
const websockets = require("./websockets");

const chatsRouter = express.Router();

chatsRouter.get(
    '/api/v2/chats',
    isAuthenticatedAPI,
    (req, res) => {
        chats.getChatsByUser(req.user.id).then(
            result => {
                if (result) {
                    res.send(result.map(prepareChat))
                } else {
                    res.status(500).send()
                }
            }
        )
    }
)

chatsRouter.post(
    '/api/v2/chats',
    isAuthenticatedAPI,
    validate.chatRequestMiddleware,
    async (req, res) => {
        let data = createAvatar()
        let key = "chat_" + uuid.v4()
        const isUploaded = await images.uploadImage(key, data, key, "image/png")
        if (!isUploaded) {
            res.sendStatus(500)
            return
        }
        chats.addChat(req.body.users, req.body.chatType, req.body.name, key + ".png").then(
            chat => {
                if (chat) {
                    websockets.sendByUserArray(
                        chat.users,
                        websockets.createResponse(
                            "/api/v2/chats",
                            "POST",
                            "/api/v2/chats/:id",
                            {id: chat.id}
                        ),
                        req.user.id
                    )
                    res.send(prepareChat(chat))
                } else {
                    res.sendStatus(500)
                }
            }
        )
    }
)

chatsRouter.get(
    '/api/v2/chats/:id',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isChatExists(x => x.params.id),
    validate.isChatAccessible(x => x.params.id, x => x.user.id),
    (req, res) => {
        chats.getChat(req.params.id).then(
            chat => {
                if (chat) {
                    res.send(prepareChat(chat))
                } else {
                    res.sendStatus(500)
                }
            }
        )
    }
)

chatsRouter.delete(
    '/api/v2/chats/:id',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isChatExists(x => x.params.id),
    validate.isChatAccessible(x => x.params.id, x => x.user.id),
    accessChat(x => x.params.id),
    (req, res) => {
        chats.deleteChat(req.params.id).then(
            bool => {
                if (bool) {
                    websockets.sendByUserArray(
                        req.chat.users,
                        websockets.createResponse(
                            "/api/v2/chats/:id",
                            "DELETE",
                            undefined,
                            {id: req.chat.id}
                        ),
                        req.user.id
                    )
                    res.send()
                } else {
                    res.sendStatus(500)
                }
            }
        )
    }
)

chatsRouter.post(
    '/api/v2/chats/:chatId/user',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.chatId = Number.parseInt(x.params.chatId)),
    wrapWithNext(x => x.query.userId = Number.parseInt(x.query.userId)),
    validate.isCorrectId(x => x.params.chatId),
    validate.isCorrectId(x => x.query.userId),
    validate.isChatExists(x => x.params.chatId),
    validate.isUserExists(x => x.query.userId),
    validate.isChatChangeable(x => x.params.chatId),
    validate.isChatNotAccessible(x => x.params.chatId, x => x.query.userId),
    validate.isChatAccessible(x => x.params.chatId, x => x.user.id),
    accessChat(x => x.params.chatId),
    (req, res) => {
        chats.addUserInChat(req.params.chatId, req.query.userId).then(
            bool => {
                if (bool) {
                    websockets.sendByUserArray(
                        req.chat.users,
                        websockets.createResponse(
                            "/api/v2/chats/:chatId/user",
                            "POST",
                            "/api/v2/users/{idOrLogin}",
                            {userId: req.query.userId, chatId: req.params.chatId}
                        ),
                        req.user.id
                    )
                    res.send()
                } else {
                    res.sendStatus(500)
                }
            }
        )
    }
)

chatsRouter.delete(
    '/api/v2/chats/:chatId/user',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.chatId = Number.parseInt(x.params.chatId)),
    wrapWithNext(x => x.query.userId = Number.parseInt(x.query.userId)),
    validate.isCorrectId(x => x.params.chatId),
    validate.isCorrectId(x => x.query.userId),
    validate.isChatExists(x => x.params.chatId),
    validate.isUserExists(x => x.query.userId),
    validate.isChatChangeable(x => x.params.chatId),
    validate.isChatAccessible(x => x.params.chatId, x => x.query.userId),
    validate.isChatAccessible(x => x.params.chatId, x => x.user.id),
    accessChat(x => x.params.chatId),
    (req, res) => {
        chats.deleteUserFromChat(req.params.chatId, req.query.userId).then(
            bool => {
                if (bool) {
                    websockets.sendByUserArray(
                        req.chat.users,
                        websockets.createResponse(
                            "/api/v2/chats/:chatId/user",
                            "DELETE",
                            undefined,
                            {userId: req.query.userId, chatId: req.params.chatId}
                        ),
                        req.user.id
                    )
                    res.send()
                } else {
                    res.sendStatus(500)
                }
            }
        )
    }
)

chatsRouter.get(
    '/api/v2/chats/:chatId/avatar',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.chatId = Number.parseInt(x.params.chatId)),
    validate.isCorrectId(x => x.params.chatId),
    validate.isChatExists(x => x.params.chatId),
    validate.isChatAccessible(x => x.params.chatId, x => x.user.id),
    (req, res) => {
        chats.getChat(req.params.chatId).then(
            chatInfo => {
                if (chatInfo === undefined) {
                    res.sendStatus(500)
                }
                images.getImage(chatInfo.avatarPath).then(
                    data => {
                        if (data === undefined) {
                            res.sendStatus(500)
                            return
                        }
                        res.setHeader('Content-Disposition', 'inline; filename="' + data.name + '"');
                        res.type(data.mimetype)
                        res.send(data.buffer)
                    }
                )
            }
        )
    }
)

chatsRouter.post(
    '/api/v2/chats/:chatId/avatar',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.chatId = Number.parseInt(x.params.chatId)),
    validate.isCorrectImage(x => x.files ? x.files.avatar : undefined),
    validate.isCorrectId(x => x.params.chatId),
    validate.isChatExists(x => x.params.chatId),
    validate.isChatAccessible(x => x.params.chatId, x => x.user.id),
    accessChat(x => x.params.chatId),
    (req, res) => {
        const key = "chat_" + req.params.chatId;
        images.uploadImage(key, req.files.avatar.data, req.files.avatar.name, req.files.avatar.mimetype).then(
            async result => {
                if (result && await chats.updateChatAvatarPath(req.params.chatId, key)) {
                    websockets.sendByUserArray(
                        req.chat.users,
                        websockets.createResponse(
                            "/api/v2/chats/:chatId/avatar",
                            "POST",
                            "/api/v2/chats/:chatId/avatar",
                            {chatId: req.params.chatId}
                        ),
                        req.user.id
                    )
                    res.send();
                } else {
                    res.status(500).send()
                }
            }
        )
    }
)

chatsRouter.get(
    '/api/v2/chats/:chatId/messages',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.chatId = Number.parseInt(x.params.chatId)),
    validate.isCorrectId(x => x.params.chatId),
    validate.isChatExists(x => x.params.chatId),
    validate.isChatAccessible(x => x.params.chatId, x => x.user.id),
    (req, res) => {
        messages.getMessagesFromChat(req.params.chatId).then(
            entries => {
                if (entries === undefined) {
                    res.sendStatus(500)
                } else {
                    res.send(entries.map(prepareMessage))
                }
            }
        )
    }
)


module.exports = {chatsRouter}
