const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "ocni"
});

db.connect();
console.log('DB CONNECTED');

module.exports = db;