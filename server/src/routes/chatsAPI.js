const express = require('express');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const chats = require('../database/dbChats');

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

chatsRouter.get(
    '/api/v2/chat',
    isAuthenticatedAPI,
    (req, res) => {
        if (req.query.id) {
            chats.getChat(id).then(
                result => res.send(result),
                error => res.status(500).send()
            )
        }
    }
)

chatsRouter.post(
    '/api/v2/chat',
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

chatsRouter.delete(
    '/api/v2/chat',
    isAuthenticatedAPI,
    (req, res) => {
        chats.deleteChat(req.query.id).then(
            result => res.send(result),
            error => res.status(500).send()
        )
    }
)

module.exports = {chatsRouter}
