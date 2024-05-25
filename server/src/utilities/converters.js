function rename(object, oldName, newName) {
    if (oldName in object) {
        object[newName] = object[oldName]
        delete object[oldName]
    }
}

function convertUser(user) {
    rename(user, "avatar_path", "avatarPath")
    return user
}

function convertChat(chat) {
    rename(chat, "avatar_path", "avatarPath")
    return chat
}

function convertMessage(message) {
    rename(message, "chat_id", "chatId")
    rename(message, "sender_id", "senderId")
    rename(message, "time", "sendingTime")
    rename(message, "message", "content")
    rename(message, "image_path", "imageContent")
    return message;
}

module.exports = {convertUser, convertChat, convertMessage}
