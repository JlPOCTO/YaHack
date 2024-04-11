const fs = require('fs');

function fetchNames() {
    try {
        const jsNames = fs.readdirSync('../Client/build/static/js');
        const cssNames = fs.readdirSync('../Client/build/static/css');
        return {js: jsNames, css: cssNames}
    } catch (err) {
        console.error("Ошибка при чтении директории:", err);
    }
}

module.exports = {fetchNames}
