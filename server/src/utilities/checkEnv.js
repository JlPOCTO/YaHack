function check(param) {
    if (!process.env[param]) {
        console.error(`Missing ${param}`);
        return false;
    }
    return true;
}

const PARAMS = [
    'GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
    'LINK',
    'PORT',
    'EXPRESS_SESSION_SECRET',
    'DATABASE',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'BUCKET'
];

module.exports = function checkEnv() {
    let result = PARAMS.map(check).reduce((acc, val) => acc && val, true)
    if (!result) {
        console.error("В .env не хватает параметров. Проверьте чат и добавьте в файл пропущенное")
        process.exit(1);
    }
}
