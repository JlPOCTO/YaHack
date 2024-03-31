const fs = require('fs');
function fetchNames() {
    try {
        const jsNames = fs.readdirSync('../Client/build/static/js');
        const cssNames = fs.readdirSync('../Client/build/static/css');
        const mediaNames = fs.readdirSync('../Client/build/static/media');
        return {js : jsNames, css : cssNames, media : mediaNames}
    } catch (err) {
        console.error("Ошибка при чтении директории:", err);
    }
}

module.exports = {fetchNames}