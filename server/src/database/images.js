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

async function uploadImage(key, imageData, name, mimetype) {
    const params = {
        Bucket: process.env.BUCKET,
        Key: key,
        Body: imageData,
        ContentType: mimetype,
        Metadata: {
            name: name,
            mimetype: mimetype,
        }
    };
    try {
        const command = new st.PutObjectCommand(params);
        await storage.send(command);
        console.log(`Файл ${key} успешно загружен`);
        return true;
    } catch (error) {
        console.error(`Ошибка при загрузке файла ${key}`, error);
        return false;
    }
}

async function getImage(key) {
    const params = {
        Bucket: process.env.BUCKET,
        Key: key,
    };
    try {
        const command = new st.GetObjectCommand(params);
        const result = await storage.send(command);
        console.log(`Файл ${key} успешно получен`);
        return {
            buffer: Buffer.from(await result.Body.transformToByteArray()),
            name: result.Metadata.name,
            mimetype: result.Metadata.mimetype,
        };
    } catch (error) {
        console.error(`Ошибка при получении файла ${key}`, error);
    }
}

async function deleteImage(key) {
    const params = {
        Bucket: process.env.BUCKET,
        Key: key
    };
    try {
        const command = new st.DeleteObjectCommand(params);
        await storage.send(command);
        console.log(`Файл ${key} успешно удален`);
        return true;
    } catch (error) {
        console.error(`Ошибка при удалении файла ${key}`, error);
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
