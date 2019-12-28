const question_controller = require('../controllers/question_controller');
const user_controller = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.get('/home', function (req, res) {
    if (typeof cookieSession.userID === 'undefined'
        || cookieSession.userID == '') {
        console.log("undefined: " + cookieSession.userID);
        res.redirect('/gethome');
        // res.render('signup');
    }
    else {
        console.log("defined: " + cookieSession.userID);
        res.redirect('/gethome');
    }
});

// router.get('/home', user_controller.getHome)

router.get('/', function (req, res) {
    if (typeof cookieSession.userID === 'undefined'
        || cookieSession.userID == '') {
        console.log("undefined: " + cookieSession.userID);
        res.render('signup');
    }
    else {
        console.log("defined: " + cookieSession.userID);
        res.rendirect('/gethome');
    }
})

router.get('/gethome', user_controller.getHome)

router.get('/allmessages', function (req, res) {
    if (typeof cookieSession.userID === 'undefined'
        || cookieSession.userID == '') {
        console.log("undefined: " + cookieSession.userID);
        res.render('signup');
    }
    else {
        console.log("defined: " + cookieSession.userID);
        res.render('allmessages');
    }
});

// router.get('/myprofile', function (req, res) {
//     res.render('myprofile');
// });

router.get('/otherprofile', function (req, res) {
    res.render('otherprofile');
});

router.get('/edit-profile/:id', user_controller.getUser);

router.get('/myprofile', user_controller.getUserProfile);

router.get('/question_controller/get_user_questions', question_controller.get_user_questions);

router.get('/user_controller/get_user_details', user_controller.get_user_details);

module.exports = router;
