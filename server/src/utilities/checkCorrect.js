const maxNameLength = 128;
const maxTextLength = 4096;

function checkValidId(id) {
    if (!id) return false;
    if (Number.isSafeInteger(id) && Number(id) >= 0) {
        return true;
    }
    return false;
}

function checkValidChatType(type) {
    return type == "direct" || type == "group";
}

function checkValidName(name) {
    return typeof name === 'string' && name.length <= maxNameLength && name.trim().length > 0;
}

function checkValidText(text) {
    return typeof text === 'string' && text.length <= maxTextLength && text.length > 0;
}

function checkPostChat(req) {
    if (!req.users || !req.chatType || !req.name) return false;

    var res = true;
    const users = req.users;

    if (Array.isArray(users)) {
        for (user of users) {
            res &= checkValidID(user);
        }
    } else if (!checkValidID(users)) {
        res = false;
    }

    res &= checkValidChatType(req.chatType);
    res &= checkValidName(req.name);

    return res;
}

function checkAddOrDeleteUserToChat(req) {
    var res = true;
    res &= checkValidID(req.query.chatID);
    res &= checkValidID(req.query.userID);

    return res;
}

function checkGetOrDeleteMessage(req) {
    return checkValidID(req.query.id);
}

function getLastMessage(req) {
    return checkValidID(req.query.chatID);
}

function checkGetMessages(req) {
    var res = true;
    res &= checkValidID(req.query.chatID);

    if (req.query.lastMessageId) {
        res &= checkValidID(req.query.lastMessageId);
    }

    return res;
}

function checkPostMessage(req) {
    var res = true;
    res &= checkValidID(req.query.chatID);
    res &= checkValidID(req.query.fromID);
    res &= checkValidText(req.query.messageText);

    return res;
}

function checkGetOrDeleteReaction(req) {
    return checkValidID(req.query.id);
}

module.exports = {
    checkValidName,
    checkValidId,
    checkPostChat,
    checkAddOrDeleteUserToChat,
    checkGetOrDeleteMessage,
    getLastMessage,
    checkGetMessages,
    checkPostMessage,
    checkGetOrDeleteReaction
};