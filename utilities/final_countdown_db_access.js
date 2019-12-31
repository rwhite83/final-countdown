const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3317115',
    database: 'sql3317115',
    password: 'MVuS3yCznh'
});

module.exports = pool.promise();