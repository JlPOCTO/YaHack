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
routers.get(
    '/auth/github',
    passport.authenticate('github')
);

routers.get(
    '/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/home')
    }
);

routers.get(
    '/',
    (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect('/home');
        }
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage()));
    }
)

routers.get(
    '/logout',
    isAuthenticated,
    (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }
);

routers.get(
    '/home',
    isAuthenticated,
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage()));
    }
);

// Руты, связанные с API

routers.use(isAuthenticatedAPI);

routers.get(
    '/api/v1/user',
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

routers.get(
    '/api/v1/user/avatar',
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

routers.post(
    '/api/v1/user/avatar',
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

routers.get(
    '/api/v1/users',
    (req, res) => {
        users.getAllUsers().then(
            result => res.send(result),
            error => res.status(500).send()
        )
    }
)

routers.get(
    '/api/v1/chats',
    (req, res) => {
        chats.getChatsByUser(req.user.id).then(
            result => res.send(result),
            error => res.status(500).send()
        )
    }
)

routers.get(
    '/api/v1/chat',
    (req, res) => {
        if (req.query.id) {
            chats.getChat(id).then(
                result => res.send(result),
                error => res.status(500).send()
            )
        }
    }
)

routers.post(
    '/api/v1/chat',
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

routers.delete(
    '/api/v1/chat',
    (req, res) => {
        chats.deleteChat(req.query.id).then(
            result => res.send(result),
            error => res.status(500).send()
        )
    }
)

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


// Рут по умолчанию (для неизвестных)
routers.get(
    '*',
    isAuthenticated,
    (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(getBasePage())); //TODO Страница ошибки
    }
);

module.exports = {routers}
