const fs = require('fs');

function fetchNames() {
    try {
        const jsNames = fs.readdirSync('../client/build/static/js');
        const cssNames = fs.readdirSync('../client/build/static/css');
        return {js: jsNames, css: cssNames}
    } catch (err) {
        console.error("Ошибка при чтении директории:", err);
    }
}

module.exports = {fetchNames}
