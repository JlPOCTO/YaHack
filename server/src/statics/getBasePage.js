const { fetchNames } = require("./fetchNames")

function getBasePage() {
    const names = fetchNames()

    return `
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Kilogram</title>
        ${names.css.map(name => {
        return `<link rel="stylesheet" href="/${name}">`
    }).join("\n")}
    </head>
    <body>
        <div id="root"/> 
    </body>
    ${names.js.map(name => {
        return `<script src="/${name}">\n</script>`
    }).join("\n")}
</html>`
}

module.exports = {getBasePage}
