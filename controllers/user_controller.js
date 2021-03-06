const model = require('../models/final_countdown_model');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs')

exports.login_user = (req, res) => {
    let password = req.body.password_attempt;
    console.log('login user fired from user controller');
    model.login_user(req.body, function (model_response) {
        let userPw = model_response[0].userPassword;
        bcrypt.compare(password, userPw, function (err, bcrypt_res) {
            if (res) {
                req.session.userEmail = model_response[0].userEmail;
                res.redirect('/');
            } else {
                console.log('invalid password');
            }
        })
    })
};

exports.signup_user = (req, res) => {
    console.log('signup user fired from user controller');
    model.check_email(req.body, function (model_response) {
        if (model_response > 0) res.render('login', { 'messageData': 'Email Already In Use.  Please Try Again' })
        else {
            let pw1 = req.body.password_01;
            let pw2 = req.body.password_02;
            if (pw1.localeCompare(pw2) == 0) {
                console.log('passwords match');
                model.signup_user(req.body);
                req.session.userEmail = req.body.email_signup
                res.render('index', { 'emailData': req.session.userEmail, 'messageData': 'Welcome to the Final Countdown.  Please Press the Button', 'entryList': '' });
            }
            else {
                console.log('mismatched passwords');
                res.render('login', { 'messageData': 'Passwords Do Not Match, Please Try Again' });
            }
        }
    })
}

exports.logout_user = (req, res) => {
    console.log('logout user fired from user controller');
    req.session.userEmail = '';
    res.redirect('/');
};