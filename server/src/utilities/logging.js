function logError(func, args, error) {
    console.error("Произошла ошибка в функции", func)
    console.error("Аргументы вызова:", Object.values(args))
    console.error(error)
}

module.exports = {logError}
