const express = require('express');
const chats = require('../database/dbChats');
const messages = require('../database/dbMessages');
const images = require('../database/images');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const validate = require('../middlewares/validationMiddleware');
const uuid = require('uuid');
const {createAvatar} = require("../utilities/avatars");
const {prepareChat, prepareMessage} = require("../utilities/converters");
const {wrapWithNext} = require("../middlewares/wrapWithNext");

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
        let avatarPath = "chat_" + uuid.v4() + ".svg"
        const isUploaded = await images.uploadImage(avatarPath, data)
        if (isUploaded) {
            chats.addChat(req.body.users, req.body.chatType, req.body.name, avatarPath).then(
                chat => {
                    if (chat) {
                        res.send(prepareChat(chat))
                    } else {
                        res.sendStatus(500)
                    }
                }
            )
            return
        }
        res.sendStatus(500)
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
    (req, res) => {
        chats.deleteChat(req.params.id).then(
            bool => {
                if (bool) {
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
    (req, res) => {
        chats.addUserInChat(req.params.chatId, req.query.userId).then(
            bool => {
                if (bool) {
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
    (req, res) => {
        chats.deleteUserFromChat(req.params.chatId, req.query.userId).then(
            bool => {
                if (bool) {
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
                        res.contentType('image/png');
                        res.send(Buffer.from(data, 'binary'))
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
    validate.isCorrectId(x => x.params.chatId),
    validate.isChatExists(x => x.params.chatId),
    validate.isChatAccessible(x => x.params.chatId, x => x.user.id),
    (req, res) => {
        const name = "chat_" + req.params.chatId + ".png";
        images.uploadImage(name, req.body).then(
            async result => {
                if (result && await chats.updateChatAvatarPath(req.params.chatId, name)) {
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
