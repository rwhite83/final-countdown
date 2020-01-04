const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: '674OLZOFKa',
    database: '674OLZOFKa',
    password: 'WMsBj9Rlmb'
});

module.exports = pool.promise();