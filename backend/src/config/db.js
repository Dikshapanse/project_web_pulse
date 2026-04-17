const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',

    user: 'root', // Assumed standard local xampp credentials
    password: '',
    database: 'web_pulse_new',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});


module.exports = pool;
