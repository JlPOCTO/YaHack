const express = require('express');
const passport = require('passport');
const {getBasePage} = require("./statics/getBasePage");
const {isAuthenticated} = require("./middlewares/isAuthenticated");
const {isAuthenticatedAPI} = require("./middlewares/isAuthenticatedAPI");
const chats = require('./database/dbChats');
const users = require('./database/dbUsers');
const messages = require("./database/dbMessages");
const images = require('./database/images');
const {createAvatar} = require('./utilities/createAvatar');
const {createRandomString} = require('./utilities/createRandomString');

const routers = express.Router();

const version = process.env.API_VERSION;

// Руты, связанные со страницами


// Руты, связанные с API


// v2


routers.get('/dialogs', async (req, res) => {
    //currentUser to be added
    res.send(await chats.getChatsByUser(1));
});
// routers.get(
//     version + '/myInfo',
//     (req, res) => {
//         res.send(req.user);
//     }
// );
routers.get('/me', async (req, res) => {
    //currentUser to be added
    // res.send(req.user);
    res.send(await users.findUserByID(1));
});
routers.get('/contacts', async (req, res) => {
    //currentUser to be added
    res.send(await users.findAllUsers());
});
routers.get('/dialogs/:id/messages', async (req, res) => {
    let a = req.query.id
    res.send(await chats.getMessagesFromChat(a))
});

routers.get('/messages', async (req, res) => {
    let a = req.query.id
    res.send(await chats.getMessagesFromChat(a))
});


routers.post('/addMessage', async (req, res) => {
    const message = req.body.message;
    const chatID = req.body.chatID;
    const senderID = req.body.senderID;
    const time = req.body.time;
    const imagePath = req.body.imagePath;
    await chats.addMessage(chatID,senderID,message,time,imagePath)
    res.send(await chats.getMessagesFromChat(chatID))
    // console.log(await chats.getMessagesFromChat(chatID))
})



routers.get('/dialogs', async (req, res) => {
    //currentUser to be added
    res.send(await chats.getChatsByUser(1));
});

routers.get('/me', async (req, res) => {
    //currentUser to be added
    res.send(await users.findUserByID(1));
});
routers.get('/contacts', async (req, res) => {
    //currentUser to be added
    res.send(await users.findAllUsers());
});
routers.get('/dialogs/:id/messages', async (req, res) => {
    let a = req.query.id
    res.send(await chats.getMessagesFromChat(a))
});

routers.get('/messages', async (req, res) => {
    let a = req.query.id
    res.send(await chats.getMessagesFromChat(a))
});

// app.post('/addMessage', async(req, res) => {
//     const dialogID = req.body.dialogID;
//     chats.addMessage(req.body.message)
// })



module.exports = {routers}
