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




module.exports = {routers}
