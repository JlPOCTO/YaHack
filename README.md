# YaHack

Как запустить сервер:
1. Сбилдить client: в директории /client написать команды:  
    npm install  
    npm run build
2. Вместо первого пункта можно теперь просто запускать  
    npm run watch
2. Создаем в папке /server файл .env и добавляем туда содержимое из чата
3. Запустить server: в директории /server написать команды:  
    npm install  
    npm run dev
4. Открываем http://127.0.0.1:3000 и смотрим на результат

Также существует продакшн версия, находящаяся по адресу: http://team5.ya-itmo.ru

Как запустить скрипт создания базы данных:
1. Запустить скрипт из директории /server:  
  npm run create-db
2. Если вам нужна база данных с какими-то тестовыми значениями, то после предыдущей команды нужно запустить:  
  npm run fill-test-db

 По умолчанию эти скрипты создают файл по пути ./src/sqlite.db (это же значение указывается в .env).
 При желании скрипты можно запустить для любого другого файлового пути, если вам зачем-то нужна отдельная база. 
 
Swagger: https://editor.swagger.io  
Заходите на этот сайт, импортируете файл yahackAPI.yaml. После этого, вы можете
смотреть на API в более удобном формате, и даже отправлять запросы на сервер
(работает только если сервер запущен в тестовом режиме)


Для запуска сервера в режиме тестирования нужно указать в .env после MODE
со значенем "TEST". При таком режиме сервер не требует авторизации для использования
API, и использует заглушку юзера (указывается в isAuthenticatedAPI).
После этого можно использовать Swagger для тестирования
