const entry_controller = require('../controllers/entry_controller');
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.get('/', function (req, res) {
    let sessionEmail = req.session.userEmail;
    console.log('session id in home.js: ' + sessionEmail);
    if (typeof req.session.userEmail === 'undefined'
        || req.session.userEmail == '' || req.session.userEmail == {}) {
        console.log('user not logged in, forwarding to signup/login');
        res.render('login', { 'messageData': 'Please sign up or log in to get started!' });
    }
    else {
        console.log('user logged in.  forwarding to index');
        entry_controller.get_user_entries(req, function(entry_data) {
            console.log(entry_data);
            res.render('index', { 'entryList': entry_data, 'emailData': req.session.userEmail, 'messageData':'Welcome to the Final Countdown.  Please Press the Button' } );
        });
    }
})

module.exports = router;