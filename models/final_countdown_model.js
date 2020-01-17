const db = require('../utilities/final_countdown_db_access');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs')

function login(data, callback) {
    console.log('login fired from model');
    let email = data.email_attempt;
    let password = data.password_attempt;
    let sql_statement = "SELECT * FROM users WHERE userEmail = ?";
    let sql_params = [email];
    statement = db.format(sql_statement, sql_params);
    db.query(statement, (err, result) => {
        if (err) throw err;
        callback(result);
    });
}

function check(data, callback) {
    console.log('check fired')
    let user = data.email_signup;
    let sql_statement = 'SELECT * FROM users WHERE userEmail = ?';
    let sql_params = [user];
    statement = db.format(sql_statement, sql_params);
    db.query(statement, (err, result) => {
        if (err) throw err;
        callback(result.length);
    });
}

function signup(data) {
    console.log('signup fired')
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(data.password_01, salt, function (err, hash) {
            let user = {
                userId: null,
                userEmail: data.email_signup,
                userPassword: hash
            };
            let sql_statement = 'INSERT INTO users SET ?';
            let sql_params = [user];
            statement = db.format(sql_statement, sql_params);
            db.query(statement, function (err) {
                if (err) throw err;
            });
        })

    })
}

function add(data, email, callback) {
    console.log(email)
    let entry = {
        entryId: null,
        entryUserEmail: email,
        entryName: data.new_entry_name,
        entryDate: data.new_entry_date + " " + data.new_entry_time
    };
    let sql_statement = 'INSERT INTO entries SET ?';
    let sql_params = [entry];
    statement = db.format(sql_statement, sql_params);
    db.query(statement, function (err) {
        if (err) throw err;
    });
    callback();
}

function delete_one(data, callback) {
    console.log(data)
    let sql_statement = 'DELETE FROM entries WHERE entryId = ?';
    let sql_params = [data];
    statement = db.format(sql_statement, sql_params);
    db.query(statement, function (err) {
        if (err) throw err;
    });
    callback();
}

function get(email, callback) {
    console.log('model fired');
    let sql_statement = 'SELECT * FROM entries WHERE entryUserEmail = ? ORDER BY entryDate ASC';
    let sql_params = [email];
    statement = db.format(sql_statement, sql_params);
    db.query(statement, (err, result) => {
        if (err) throw err;
        else callback(result);
    });
}

module.exports = {
    login_user: login,
    signup_user: signup,
    check_email: check,
    add_entry: add,
    delete_entry: delete_one,
    get_entries: get
}