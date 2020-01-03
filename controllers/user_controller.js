const model = require('../models/final_countdown_model');
const cookieSession = require('cookie-session');

exports.login_user = (req, res) => {
    let password = req.body.password_attempt;
    console.log('login user fired from user controller');
    console.log(req.body);
    model.login_user(req.body, function (model_response) {
        let userPw = model_response[0].userPassword;
        if (userPw.localeCompare(password) != 0) console.log('invalid password');
        else {
            req.session.userEmail = model_response[0].userEmail;
            res.redirect('/');
        }
    })
};

exports.signup_user = (req, res) => {
    console.log('signup user fired from user controller');
    model.check_email(req.body, function (model_response) {
        if (model_response > 0) res.render('login', { 'messageData': 'Email Already In Use.  Please Try Again'})
        else {
            let pw1 = req.body.password_01;
            let pw2 = req.body.password_02;
            if (pw1.localeCompare(pw2) == 0) {
                console.log('passwords match');
                model.signup_user(req.body);
                req.session.userEmail = req.body.email_signup
                res.render('index', { 'emailData': req.session.userEmail }, { 'welcomeData':'Welcome to the Final Countdown.  Please Press the Button' } );
            }
            else {
                console.log('mismatched passwords');
                res.render('login', { 'messageData':'Passwords Do Not Match, Please Try Again' } );
            }
        }
    })
}

exports.logout_user = (req, res) => {
    console.log('logout user fired from user controller');
    req.session.userEmail = '';
    res.redirect('/');
};