const express = require('express');
const images = require('../database/images');
const users = require('../database/dbUsers');
const {isAuthenticatedAPI} = require("../middlewares/isAuthenticatedAPI");
const {wrapWithNext} = require("../middlewares/wrapWithNext");
const validate = require("../middlewares/validationMiddleware");
const {prepareUser} = require("../utilities/converters");

const usersRouter = express.Router();

usersRouter.get(
    '/api/v2/users/me',
    isAuthenticatedAPI,
    (req, res) => {
        console.log(req.user);
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
                res.send(data)
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


usersRouter.get(
  '/api/v2/users/find/:loginPart',
  isAuthenticatedAPI,
  validate.isCorrectLogin(x => x.params.loginPart),
  (req, res) => {
    users.getAllUsers().then(
      result => {
        console.log(result);
        if (result !== undefined) {
          const newResult = result.filter((user) => {
            console.log(user.login.includes(req.params.loginPart))
            user.login.includes(req.params.loginPart);
          })
          console.log(newResult);
          res.send(newResult);
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
                        res.send(data)
                    }
                )
            }
        )
    }
)

usersRouter.post(
    '/api/v2/users/myAvatar',
    isAuthenticatedAPI,
    (req, res) => {
        const name = "user_" + req.user.id + ".png";
        images.uploadImage(name, req.body).then(
            async result => {
                if (result && await users.updateUserAvatar(req.user.id, name)) {
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
                    res.send(result)
                } else {
                    res.sendStatus(500)
                }
            }
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

module.exports = {usersRouter}
