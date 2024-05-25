const avatar = require('identicon')
const {createRandomString} = require("./createRandomString")

async function createAvatar() {
    return avatar.genSync(createRandomString(16), 150)
}
module.exports = {createAvatar};
