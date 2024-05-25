const express = require('express');
const {isAuthenticatedAPI} = require("./middlewares/isAuthenticatedAPI");
const chats = require('../database/dbChats');
const images = require('../database/images');
const validator = require('../utilities/checkCorrect');
const { v4: uuidv4 } = require('uuid');

const chatsRouter = express.Router();

chatsRouter.get(
    '/api/v2/chats',
    isAuthenticatedAPI,
    (req, res) => {
        chats.getChatsByUser(req.user.id).then(
            result => res.send(result),
            error => res.status(500).send()
        )
    }
)

chatsRouter.post(
    '/api/v2/chats',
    isAuthenticatedAPI,
    async (req, res) => {
        let data = await createAvatar();
        let avatarPath = "chat_" + createRandomString(8) + ".svg"
        await images.uploadImage(avatarPath, data);
        chats.addChat(req.body.users, req.body.chatType, req.body.name, avatarPath).then(
            result => res.send(result),
            error => res.status(500).send()
        )
    }
)

chatsRouter.get(
    '/api/v2/chats/:id',
    isAuthenticatedAPI,
    (req, res) => {
        id = req.params.id
        if (id) {
            chats.getChat(id).then(
                result => res.send(result),
                error => res.status(500).send()
            )
        }
    }
)

chatsRouter.delete(
    '/api/v2/chats/:id',
    isAuthenticatedAPI,
    (req, res) => {
        id = req.params.id
        if (id) {
            chats.deleteChat(id).then(
                result => res.send(result),
                error => res.status(500).send()
            )
        }
    }
)

chatsRouter.post(
    '/api/v2/chats/:id/user',
    isAuthenticatedAPI,
    (req, res) => {
        chatId = req.params.id
        if (chatId) {
            userId = req.query.userId
            chats.addUserInChat(chatId, userId).then(
                result => res.send(result),
                error => res.status(500).send
            )
        }
    }
)

chatsRouter.delete(
    '/api/v2/chats/:id/user',
    isAuthenticatedAPI,
    (req, res) => {
        chatId = req.params.id
        if (chatId) {
            userId = req.query.userId
            chats.deleteUserFromChat(chatId, userId).then(
                result => res.send(result),
                error => res.status(500).send
            )
        }
    }
)

chatsRouter.get(
    '/api/v2/chats/:id/avatar',
    isAuthenticatedAPI,
    (req, res) => {
        chatId = req.params.id
        if (chatId) {
            userId = req.query.userId
            chats.getChat(chatId).then(
                chatInfo => {
                    images.getImage(chatInfo.avatarPath).then(
                        avatar => {
                            res.contentType('image/png');           // I hope it will be PNG
                            res.send(Buffer.from(data, 'binary'))
                        },
                        error => res.status(500).send
                    )
                },
                error => res.status(404).send
            )
        }
    }
)

chatsRouter.post(
    '/api/v2/chats/:id/avatar',
    isAuthenticatedAPI,
    (req, res) => {
        chatId = req.params.id
        if (chatId) {
            userId = req.query.userId
            if (!validator.checkValidId(userId)) {
                res.status(400).send
                return
            }
            const name = "chat_avatar_" + uuidv4() + "_" + userId + ".png";
            chats.updateChatAvatarPath(chatId, name)
                    
            images.uploadImage(name, req.file.buffer).then(
                sucess => req.status(200).send,
                error => res.status(500).send
            )
        }
    }
)
