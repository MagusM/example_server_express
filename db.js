import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'zqxwce12',
    database: 'blog',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

// now get a Promise wrapped instance of that pool
// const promisePool = pool.promise();
// query database using promises
// const [rows, fields] = await promisePool.query("SELECT 1");