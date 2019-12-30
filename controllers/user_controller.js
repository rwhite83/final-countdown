const model = require('../models/final_countdown_model');
const cookieSession = require('cookie-session');

exports.login_user = (req, res) => {
    let password = req.body.password_attempt;
    console.log('login user fired from user controller');
    console.log(req.body);
    model.login_user(req.body, function (model_response) {
        let userPw = model_response[0].userPassword;
        if (userPw.localeCompare(password) != 0) console.log('inalid password');
        else {
            cookieSession.userEmail = model_response[0].userEmail;
            res.redirect('/');
        }
    })
};

exports.signup_user = (req, res) => {
    console.log('signup user fired from user controller');
    model.check_email(req.body, function (model_response) {
        console.log('failed to log in.  email already exists');
        if (model_response != 0) res.redirect('/')
        else {
            let pw1 = req.body.password_01;
            let pw2 = req.body.password_02;
            if (pw1.localeCompare(pw2) == 0) {
                console.log('passwords match');
                model.signup_user(req.body);
                cookieSession.userEmail = req.body.email_signup
                res.redirect('/');
            }
            else {
                console.log('mismatched passwords');
                res.redirect('/');
            }
        }
    })
}

exports.logout_user = (req, res) => {
    console.log('logout user fired from user controller');
};