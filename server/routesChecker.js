const maxNameLength = 128;
const maxTextLength = 4096;

function checkValidID(id) {
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

function checkGetChats(req) {
    return checkValidID(req.query.userID);
}

function checkPostChat(req) {
    if (!req.query.userIDs || !req.query.chatType || !req.query.chatName) return false;

    var res = true;
    const users = req.query.userIDs;

    if (Array.isArray(users)) {
        for (user of users) {
            res &= checkValidID(user);
        }
    } else if (!checkValidID(users)) {
        res = false;
    }

    res &= checkValidChatType(req.query.chatType);
    res &= checkValidName(req.query.chatName);

    return res;
}

function checkGetMessages(req) {
    return checkValidID(req.query.chatID);
}

function checkPostMessage(req) {
    var res = true;
    res &= checkValidId(req.query.chatID);
    res &= checkValidId(req.query.fromID);
    res &= checkValidText(req.query.messageText);

    return res;
}

module.exports = {
    checkGetChats,
    checkPostChat,
    checkGetMessages,
    checkPostMessage
};