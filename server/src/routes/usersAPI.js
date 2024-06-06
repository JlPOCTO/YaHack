const express = require('express');
const images = require('../database/images');
const users = require('../database/dbUsers');
const chats = require('../database/dbChats');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const {wrapWithNext} = require("../middlewares/wrapWithNext");
const validate = require("../middlewares/validationMiddleware");
const {prepareUser} = require("../utilities/converters");

const usersRouter = express.Router();

usersRouter.get(
    '/api/v2/users/me',
    isAuthenticatedAPI,
    (req, res) => {
        res.send(prepareUser(req.user))
    }
);

usersRouter.get(
    '/api/v2/users/myAvatar',
    isAuthenticatedAPI,
    (req, res) => {
        images.getImage(req.user.avatarPath).then(
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

usersRouter.get(
    '/api/v2/users/:id(\\d+)',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isUserExists(x => x.params.id),
    (req, res) => {
        users.getUserById(req.params.id).then(
            user => {
                if (user) {
                    res.send(prepareUser(user))
                } else {
                    res.sendStatus(500)
                }
            }
        )
    }
);

usersRouter.get(
    '/api/v2/users/find/:loginPart',
    isAuthenticatedAPI,
    validate.isCorrectLogin(x => x.params.loginPart),
    (req, res) => {
        users.getAllUsers().then(
            allUsers => {
                if (allUsers !== undefined) {
                    const filtered = allUsers.filter(user => user.login.includes(req.params.loginPart))
                    res.send(filtered.map(prepareUser));
                } else {
                    res.sendStatus(500)
                }
            }
        )
    }
)

usersRouter.get(
    '/api/v2/users/:id/avatar',
    isAuthenticatedAPI,
    wrapWithNext(x => x.params.id = Number.parseInt(x.params.id)),
    validate.isCorrectId(x => x.params.id),
    validate.isUserExists(x => x.params.id),
    (req, res) => {
        users.getUserById(req.params.id).then(
            userInfo => {
                if (userInfo === undefined) {
                    res.sendStatus(500)
                    return
                }
                images.getImage(userInfo.avatarPath).then(
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

usersRouter.post(
    '/api/v2/users/myAvatar',
    isAuthenticatedAPI,
    validate.isCorrectImage(x => x.files ? x.files.avatar : undefined),
    (req, res) => {
        const key = "user_" + req.user.id;
        images.uploadImage(key, req.files.avatar.data, req.files.avatar.name, req.files.avatar.mimetype).then(
            async result => {
                if (result && await users.updateUserAvatar(req.user.id, key)) {
                    res.send();
                } else {
                    res.status(500).send()
                }
            }
        )
    }
)

usersRouter.get(
    '/api/v2/users',
    isAuthenticatedAPI,
    (req, res) => {
        users.getAllUsers().then(
            result => {
                if (result !== undefined) {
                    res.send(result.map(prepareUser))
                } else {
                    res.sendStatus(500)
                }
            }
        )
    }
)

usersRouter.get(
    '/api/v2/users/contacts',
    isAuthenticatedAPI,
    (req, res) => {
        chats.getChatsByUser(req.user.id).then(
            userChats => {
                if (userChats === undefined) {
                    res.sendStatus(500)
                    return
                }
                const contacts = userChats.filter(x => x.type === "direct")
                    .map(x => x.users.filter(user => user.id !== req.user.id)[0])
                    .map(prepareUser)
                res.send(contacts)
            }
        )
    }
)

usersRouter.get(
    '/api/v2/users/:login',
    isAuthenticatedAPI,
    validate.isCorrectLogin(x => x.params.login),
    validate.isUserExistsByLogin(x => x.params.login),
    (req, res) => {
        users.getUserByLogin(req.params.login).then(
            user => {
                if (user) {
                    res.send(prepareUser(user))
                } else {
                    res.sendStatus(500)
                }
            }
        )
    }
)

module.exports = {usersRouter}
