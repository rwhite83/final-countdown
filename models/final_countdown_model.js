const db = require('../utilities/final_countdown_db_access');

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
    let sql = 'SELECT * FROM users WHERE userEmail = "' + user + '"';
    db.query(sql, (err, result) => {
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

module.exports = {
    login_user: login,
    signup_user: signup,
    check_email: check
}