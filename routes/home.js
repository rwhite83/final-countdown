const entry_controller = require('../controllers/entry_controller');
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
        entry_controller.get_user_entries( function(entry_data) {
            console.log(entry_data);
            res.render('index', { 'entryList': entry_data } );
        });
    }
})

module.exports = router;

/*
const user_controller = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.post('/login', user_controller.login_user);

router.post('/logout', user_controller.logout_user);

router.post('/signup', user_controller.signup_user);

module.exports = router;
*/