const {getUserById, getContacts} = require("../database/dbUsers");

function init(ws) {
    module.exports.server = ws
    module.exports.currentUsers = {}
}

function sendByUserArray(userArray, response, currentUser) {
    for (let user of userArray) {
        if (process.env.MODE !== "TEST" && user.id === currentUser) {
            continue
        }
        let ws = module.exports.currentUsers[user.id]
        if (ws === undefined) {
            continue
        }
        ws.send(response)
    }
}

function createResponse(source, sourceMethod, route, content) {
    return JSON.stringify({
        source: source,
        sourceMethod: sourceMethod,
        route: route,
        content: content,
    })
}

const subscription = async (ws, req) => {
    if (process.env.MODE === "TEST") {
        req.user = await getUserById(1)
    } else if (!req.isAuthenticated()) {
        ws.send(createResponse())
        ws.close()
        return
    }

    module.exports.currentUsers[req.user.id] = ws
    const contactsOnConnect = await getContacts(req.user.id);
    if (contactsOnConnect !== undefined) {
        sendByUserArray(
            contactsOnConnect,
            createResponse(
                "/api/v2/subscribe",
                "CONNECT",
                undefined,
                {id: req.user.id},
            )
        )
    }

    ws.on('close', async function () {
        delete module.exports.currentUsers[req.user.id]
        const contactsOnDisconnect = await getContacts(req.user.id);
        if (contactsOnDisconnect !== undefined) {
            sendByUserArray(
                contactsOnDisconnect,
                createResponse(
                    "/api/v2/subscribe",
                    "DISCONNECT",
                    undefined,
                    {id: req.user.id},
                )
            )
        }
    });
}

module.exports = {init, subscription, createResponse, sendByUserArray}