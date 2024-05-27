const express = require('express');
const chats = require('../database/dbChats');
const users = require('../database/dbUsers');
const messages = require("../database/dbMessages");
const {isAuthenticated} = require("../middlewares/isAuthenticated");
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const {getBasePage} = require('../statics/getBasePage');

const oldV1Router = express.Router();
const version = process.env.API_VERSION;


//v1
oldV1Router.get(
    version + '/chats',
    isAuthenticatedAPI,
    (req, res) => {
        res.send(chats.getChatsByUser(req.query.userID));
    }
);

oldV1Router.post(
    version + '/chat',
    isAuthenticatedAPI,
    (req, res) => {
        chats.addChat(req.query.userIDs, req.query.chatType, req.query.chatName).then(
            result => res.send(result)
        )
    }
);

oldV1Router.get(
    version + '/myInfo',
    isAuthenticatedAPI,
    (req, res) => {
        res.send(req.user);
    }
);

oldV1Router.get(
    version + '/messages',
    isAuthenticatedAPI,
    (req, res) => {
        console.log("1", req)
        const chatID = req.query.chatID;
        res.send(messages.getMessagesFromChat(chatID));
    }
);

oldV1Router.post(
    version + '/message',
    isAuthenticatedAPI,
    (req, res) => {
        const chatID = req.query.chatID;
        const fromID = req.query.fromID;
        const message = req.query.messageText;
        const time = req.query.messageTime;
        const IMGPath = ""; //TODO IMG
        dbChats.addMessage(chatID, fromID, message, time, IMGPath).then(_ => {
            res.status(200)
        });
    }
)

oldV1Router.get('/dialogs', async (req, res) => {
    //currentUser to be added
    let cht = await chats.getChatsByUser(1)

    const corr = function(obj) {
        let newObj = obj;
        newObj.avatar_path = newObj.avatarPath
        delete newObj.avatarPath
        delete newObj.users

        return newObj
    }
    cht = cht.map(corr)
    res.send(cht);
});
oldV1Router.get('/me', async (req, res) => {
    //currentUser to be added
    // res.send(req.user);
    let result = await users.getUserById(1)
    const corr = function(obj) {
        let newObj = obj;
        newObj.avatar_path = newObj.avatarPath
        delete newObj.avatarPath
        return newObj
    }
    res.send(corr(result));
});
oldV1Router.get('/contacts', async (req, res) => {
    //currentUser to be added
    let usr = await users.getAllUsers()
    const corr = function(obj) {
        let newObj = {};
        newObj.name = obj.name
        return newObj
    }
    usr = usr.map(corr)
    res.send(usr);
});
oldV1Router.get('/dialogs/:id/messages', async (req, res) => {
    let a = req.query.id
    res.send(await messages.getMessagesFromChat(a))
});

oldV1Router.get('/messages', async (req, res) => {
    let a = req.query.id
    let result = await messages.getMessagesFromChat(a);
    const corr = function(obj) {
        let newObj = {};
        newObj.message = obj.content
        newObj.time = obj.sendingTime
        newObj.sender_id = obj.senderId
        newObj.image_path = ""
        return newObj
    }
    result = result.map(corr)
    console.log(result)
    res.send(result)
});


oldV1Router.post('/addMessage', async (req, res) => {
    const message = req.body.message;
    const chatID = req.body.chatID;
    const senderID = req.body.senderID;
    const time = req.body.time;
    const imagePath = req.body.imagePath;
    await messages.addMessage(chatID,senderID,message,time,imagePath)
    res.send(await messages.getMessagesFromChat(chatID))
    // console.log(await chats.getMessagesFromChat(chatID))
})

oldV1Router.get(
    '*',
    isAuthenticated,
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage())); //TODO Страница ошибки
    }
);


module.exports = {deprecatedRouter: oldV1Router}
