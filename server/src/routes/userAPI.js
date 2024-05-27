const express = require('express');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const users = require('../database/dbUsers');

const usersRouter = express.Router();

usersRouter.get(
    '/api/v2/user',
    isAuthenticatedAPI,
    (req, res) => {
        if (req.query.id !== undefined) {
            users.getUserById(req.query.id).then(
                result => res.send(result),
                error => res.status(500).send()
            );
            return;
        }
        if (req.query.login !== undefined) {
            users.getUserByLogin(req.query.login).then(
                result => res.send(result),
                error => res.status(500).send()
            );
            return;
        }
        res.send(req.user);
    }
);

usersRouter.get(
    '/api/v2/user/avatar',
    isAuthenticatedAPI,
    (req, res) => {
        if (req.query.path !== undefined) {
            images.getImage(req.query.path).then(
                result => res.send(result),
                error => res.status(500).send()
            );
            return;
        }
        res.status(400).send();
    }
)

usersRouter.post(
    '/api/v2/user/avatar',
    isAuthenticatedAPI,
    (req, res) => {
        if (req.query.path !== undefined) {
            images.uploadImage(req.query.path, req.body).then(
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

module.exports = {usersRouter}
