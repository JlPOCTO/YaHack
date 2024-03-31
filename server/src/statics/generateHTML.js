function generateHTML(jsNames, cssNames) {
    return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Kilogram</title>
        ${cssNames.map(name => {
            return `<link rel="stylesheet" href="/css/${name}">`
        }).join("\n")}
        </head>
        <body>
            <div id="root"/> 
            Hello
        </body>
        ${jsNames.map(name => {
            return `<script src="/js/${name}">\n</script>`
        }).join("\n")}
        
    </html>`
}

module.exports = {generateHTML}