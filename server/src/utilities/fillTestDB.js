const {launchDB, closeDB} = require('../database/launchDB');
const users = require('../database/dbUsers');

(async () => {
    await launchDB(process.argv[2]);

    await users.addUser(1, "admin", "admin", "test_user_1");
    await users.addUser(2, "Пример Примеров", "primer", "test_user_2");
    await users.addUser(3, "Primer Primerov", "primer2", "test_user_3");

    await closeDB();
})();
