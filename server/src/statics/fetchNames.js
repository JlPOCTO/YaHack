const fs = require('fs');

function fetchNames() {
    try {
        const files = fs.readdirSync('../client/build/assets');
        const jsNames = files.filter(fileName => fileName.endsWith('.js'));
        const cssNames = files.filter(fileName => fileName.endsWith('.css'));

        return {js: jsNames, css: cssNames}
    } catch (err) {
        console.error("Ошибка при чтении директории:", err);
    }
}

module.exports = {fetchNames}
