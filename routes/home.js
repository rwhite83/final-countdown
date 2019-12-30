const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.get('/', function (req, res) {
    let sessionEmail = cookieSession.userEmail;
    console.log('session id in home.js: ' + sessionEmail);
    if (typeof cookieSession.userEmail === 'undefined'
        || cookieSession.userEmail == '') {
        console.log('user not logged in, forwarding to signup/login');
        res.render('login', { 'messageData': 'please sign in to access service' });
    }
    else {
        console.log('user logged in.  forwarding to index');
        res.render('index', { 'emailData': cookieSession.userEmail });
    }
})

module.exports = router;