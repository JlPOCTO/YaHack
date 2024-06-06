const constants = require("./constants")

function checkId(id) {
    return id && Number.isInteger(id) && Number(id) > 0
}

function checkLogin(login) {
    return checkName(login)
}

function checkChatType(type) {
    return constants.CHAT_TYPE.includes(type)
}

function checkName(name) {
    return typeof name === 'string' && name.length <= constants.MAX_NAME_LENGTH && name.length > 0
}

function checkMessage(text) {
    return typeof text === 'string' && text.length <= constants.MAX_MESSAGE_LENGTH && text.length > 0
}

function checkUnique(numbers) {
    const set = new Set(numbers)
    return numbers.length === set.size
}

function checkImage(image) {
    if (!image) {
        return false
    }
    return constants.IMAGES_TYPE.includes(image.mimetype) && image.size < constants.IMAGE_MAX_SIZE
}

function checkFile(file) {
    if (file === undefined) {
        return true
    }
    return checkImage(file)
}

function checkChatRequest(chat) {
    if (!Array.isArray(chat.users) || !checkChatType(chat.chatType) || !checkUnique(chat.users)) {
        return false
    }
    let check = true
    for (const user of chat.users) {
        check &= checkId(user)
    }
    if (chat.chatType === "group") {
        return check && chat.users.length !== 0 && checkName(chat.name)
    }
    return check && chat.users.length === 2
}

function checkMessageRequest(message) {
    return checkId(message.chatId) && checkMessage(message.content)
}

function checkReactionRequest(reaction) {
    return checkId(reaction.messageId) && checkEmoji(reaction.reaction)
}

function checkEmoji() {
    return true
}

module.exports = {
    checkId,
    checkLogin,
    checkImage,
    checkFile,
    checkChatRequest,
    checkMessageRequest,
    checkReactionRequest,
}
