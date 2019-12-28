const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3313427',
    database: 'sql3313427',
    password: 'Kp8X2AFEzK'
});

module.exports = pool.promise();