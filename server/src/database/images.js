const st = require("@aws-sdk/client-s3");

let storage;

function initClient() {
    if (!storage) {
        storage = new st.S3Client({
            region: 'us-east-1',
            endpoint: 'https://storage.yandexcloud.net',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
}

async function uploadImage(name, imageData) {
    const params = {
        Bucket: process.env.BUCKET,
        Key: name,
        Body: imageData,
    };
    try {
        const command = new st.PutObjectCommand(params);
        await storage.send(command);
        console.log(`Файл ${name} успешно загружен`);
        return true;
    } catch (error) {
        console.error(`Ошибка при загрузке файла ${name}`, error);
        return false;
    }
}

async function getImage(name) {
    const params = {
        Bucket: process.env.BUCKET,
        Key: name
    };
    try {
        const command = new st.GetObjectCommand(params);
        const result = await storage.send(command);
        console.log(`Файл ${name} успешно получен`);
        return Buffer.from(await result.Body.transformToByteArray());
    } catch (error) {
        console.error(`Ошибка при получении файла ${name}`, error);
    }
}

async function deleteImage(name) {
    const params = {
        Bucket: process.env.BUCKET,
        Key: name
    };
    try {
        const command = new st.DeleteObjectCommand(params);
        await storage.send(command);
        console.log(`Файл ${name} успешно удален`);
        return true;
    } catch (error) {
        console.error(`Ошибка при удалении файла ${name}`, error);
        return false;
    }
}

async function listAllImages() {
    const params = {
        Bucket: process.env.BUCKET,
    };
    try {
        const command = new st.ListObjectsCommand(params);
        const result = await storage.send(command);
        console.log(`Список файлов:\n`, ...result.Contents.map(res => res.Key));
    } catch (error) {
        console.error(`Ошибка при получении списка всех файлов`, error);
    }
}


module.exports = {initClient, uploadImage, getImage, deleteImage, listAllImages};
