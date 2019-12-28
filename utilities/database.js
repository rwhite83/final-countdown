/*
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'knowledge-base-db'
})

connection.connect(function(error) {
    if(!!error) {
        console.log('error happened')
    }
    else {
        console.log('connection established')
        module.exports = connection;
    }
})
*/




/*
 * teacher's notes suggest this will be useful as in how we should do it, but as usual it doesn't work
 *
 
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'knowledge-base-db'
})

module.exports = pool.promise()
 */

/*
 *this is the code i used to make memory game work, 
 * but i did it in the model function, 
 * don't know if doing it in 'utilities' is compatible with this method
 */
