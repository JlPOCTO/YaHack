function rename(object, oldName, newName) {
    if (oldName in object) {
        object[newName] = object[oldName]
        delete object[oldName]
    }
}

function renameUserFields(user) {
    rename(user, "avatar_path", "avatarPath")
    return user
}

function renameChatFields(chat) {
    rename(chat, "avatar_path", "avatarPath")
    return chat
}

function renameMessageFields(message) {
    rename(message, "chat_id", "chatId")
    rename(message, "sender_id", "senderId")
    rename(message, "time", "sendingTime")
    rename(message, "message", "content")
    rename(message, "image_path", "imageContent")
    return message
}

function prepareUser(user) {
    delete user.avatarPath
    return user
}

function prepareChat(chat) {
    delete chat.avatarPath
    if (chat.type === "direct") {
        delete chat.name
    }
    if (chat.lastMessage) {
        prepareMessage(chat.lastMessage)
    }
    chat.users.map(prepareUser)
    return chat
}

function prepareMessage(message) {
    message.imageContent = !!message.imageContent
    return message
}

module.exports = {renameUserFields, renameChatFields, renameMessageFields, prepareChat, prepareUser, prepareMessage}
