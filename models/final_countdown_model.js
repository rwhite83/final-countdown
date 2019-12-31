const db = require('../utilities/final_countdown_db_access');
const cookieSession = require('cookie-session');

function login(data, callback) {
    console.log('login fired from model');
    let email = data.email_attempt;
    let password = data.password_attempt;
    console.log('email attempt: ' + email + " password attempt: " + password);
    let loginSql = "SELECT * FROM users WHERE userEmail = '" + email + "'";
    db.query(loginSql, (err, result) => {
        if (err) throw err;
        console.log('result in query :' + result[0].userEmail);
        callback(result);
    });
}

function check(data, callback) {
    let user = data.email_signup;
    let checkSql = 'SELECT * FROM users WHERE userEmail = "' + user + '"';
    db.query(checkSql, (err, result) => {
        if (err) throw err;
        callback(result.length);
    });
}

function signup(data) {
    let user = {
        userId: null,
        userEmail: data.email_signup,
        userPassword: data.password_01
    };

    let signupSql = 'INSERT INTO users SET ?';
    db.query(signupSql, user, function (err) {
        if (err) throw err;
    });
}

function add(data, email, callback) {
    console.log(email)
    let entry = {
        entryId: null,
        entryUserEmail: email,
        entryName: data.new_entry_name,
        entryDate: data.new_entry_date
    };

    let addSql = 'INSERT INTO entries SET ?';
    db.query(addSql, entry, function (err) {
        if (err) throw err;
    });
    callback();
}

function get(email, callback) {
    console.log('model fired');
    let getSql = 'SELECT * FROM entries WHERE entryUserEmail = "' + email + '"';
    db.query(getSql, (err, result) => {
        if (err) throw err;
        else callback(result);
    });
}

module.exports = {
    login_user: login,
    signup_user: signup,
    check_email: check,
    add_entry: add,
    get_entries: get
}