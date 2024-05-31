const express = require('express');
const {isAuthenticatedAPI} = require("./middlewares/isAuthenticatedAPI");
const users = require('./database/dbUsers');
const validator = require('../utilities/checkCorrect');
const { v4: uuidv4 } = require('uuid');

const usersRouter = express.Router();

usersRouter.get(
    '/api/v2/users/:idOrLogin',
    isAuthenticatedAPI,
    (req, res) => {
        const userId = req.params.idOrLogin
        if (!validator.checkValidId(userId)) {
            if (validator.checkValidName) {
                users.getUserByLogin(userId).then(
                    result => res.send(result),
                    error => res.status(500).send()
                );
            } else {
                res.status(404).send() 
            }
            return;
        }
        users.getUserById(req.query.id).then(
            result => res.send(result),
            error => res.status(500).send()
        );
        return;
    }
);

usersRouter.get(
    '/api/v2/users/me',
    isAuthenticatedAPI,
    (req, res) => {
        users.getUserById(req.user.id).then(
            result => res.send(result),
            error => res.status(404).send()
        );
    }
);

usersRouter.get(
    '/api/v2/user/:id/avatar',
    isAuthenticatedAPI,
    (req, res) => {
        const userId = req.params.id
        if (validator.checkValidId(userId)) {
            users.getUserById(userId).then(
                result => {
                    images.getImage(result.avatarPath).then(
                        result => res.send(result),
                        error => res.status(500).send()
                    );
                },
                error => {
                    res.status(404).send()
                    return;
                }
            )
        }
        res.status(400).send();
    }
)

usersRouter.get(
    '/api/v2/user/myAvatar',
    isAuthenticatedAPI,
    (req, res) => {
        const userId = req.user.id
        if (validator.checkValidId(id)) {
            users.getUserById(userId).then(
                result => {
                    images.getImage(result.avatarPath).then(
                        result => res.send(result),
                        error => res.status(500).send()
                    );
                },
                error => {
                    res.status(404).send()
                    return;
                }
            )
        }
        res.status(400).send();
    }
)

usersRouter.post(
    '/api/v2/user/myAvatar',
    isAuthenticatedAPI,
    (req, res) => {
        const userId = req.user.id
        if (validator.checkValidId(userId)) {
            const name = "user_avatar_" + uuidv4() + "_" + userId + ".png";
            images.uploadImage(name, req.body).then(
                result => {
                    if (result) {
                        res.send();
                    } else {
                        res.status(500).send()
                    }
                },
                error => res.status(500).send()
            );
            return;
        }
        res.status(400).send();
    }
)

usersRouter.get(
    '/api/v2/users',
    isAuthenticatedAPI,
    (req, res) => {
        users.getAllUsers().then(
            result => res.send(result),
            error => res.status(500).send()
        )
    }
)

// TODO
usersRouter.get(
    '/api/v2/users/contacts',
    isAuthenticatedAPI,
    (req, res) => {
        users.getAllUsers().then(
            result => res.send(result),
            error => res.status(500).send()
        )
    }
)
