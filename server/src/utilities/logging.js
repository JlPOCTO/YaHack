function logError(tag, args, error) {
    console.error(tag, ": произошла ошибка")
    console.error("Данные:", Object.values(args))
    console.error("Ошибка:", error)
}

module.exports = {logError}
