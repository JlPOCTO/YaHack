function checking(param) {
    if (!process.env[param]) {
        console.error(`Missing ${param} in .env`);
        return true;
    }
    return false;
}

const PARAMS = [
    'GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
    'LINK',
    'PORT',
    'EXPRESS_SESSION_SECRET',
    'DATABASE'
];

module.exports = function checkEnv() {
    let check = PARAMS.map(param => checking(param)).reduce((acc, val) => acc || val, false)
    if (check) {
        console.error("Вероятно в одном из последних обновлений в .env файл вошел новый параметр. Проверьте чат и добавьте в файл пропущенное")
        process.exit(1);
    }
}