const express = require('express');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const messages = require('../database/dbMessages');
const chats = require('../database/dbChats')
const images = require('../database/images');
const { v4: uuidv4 } = require('uuid');
const {uploadImage} = require("../database/images");

const routers = express.Router();

routers.get(
    '/api/v2/messages/:id',
    isAuthenticatedAPI,
    (req, res) => {
        messages.getMessage(req.params.id).then(
            result => res.send(result),
            error => res.status(500).send()
        )
    }
)

routers.delete(
    '/api/v2/messages/:id',
    isAuthenticatedAPI,
    (req, res) => {
        messages.deleteMessage(req.params.id).then(
            result => {
                if (result) {
                    res.send()
                } else {
                    res.status(500).send()
                }
            },
            error => res.status(500).send()
        )
    }
)

routers.post(
    '/api/v2/messages',
    isAuthenticatedAPI,
    async (req, res) => {
        let name = ""
        if (req.body.imageContent) {
            const name = "message_" + uuidv4() + "_" + req.user.id + ".png";
            await uploadImage(name, req.body.imageContent);
        }
        messages.addMessage(req.user.id, req.body.chatId, req.body.content, name, Date.now()).then(
            result => {
                if (result) {
                    res.send(result)
                } else {
                    res.status(500).send()
                }
            },
            error => res.status(500).send()
        )
    }
)

routers.get(
    '/api/v2/messages/:id/image',
    isAuthenticatedAPI,
    (req, res) => {
        chats.getChat(req.params.id).then(
            chat => {
                if (chat) {
                    images.getImage(chat.imageContent).then(
                        result => res.send(result)
                    )
                } else {
                    res.status(500).send()
                }
            },
            error => res.status(500).send()
        )
    }
)

module.exports = {messagesRouter: routers}
