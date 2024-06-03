const avatar = require('identicon')
const uuid = require('uuid');

function createAvatar() {
    return avatar.genSync(uuid.v4(), 150)
}
module.exports = {createAvatar};
