const question_controller = require('../controllers/question_controller');
const express = require('express');
const router = express.Router();

router.get('/allquestions', function (req, res) {
    res.render('allquestions');
});

router.get('/question', function (req, res) {
    res.render('question');
});

// router.get('/search', function (req, res) {
//     res.render('search');
// });

router.get('/search-results', function (req, res) {
    if (typeof cookieSession.userID === 'undefined'
        || cookieSession.userID == '') {
        console.log("undefined: " + cookieSession.userID);
        res.render('signup');
    }
    else {
        console.log("defined: " + cookieSession.userID);
        res.render('search-results');
    }
});

router.post('/search', question_controller.search)

router.post('/postquestion', question_controller.post_question);

router.get('/getuserquestions', question_controller.get_user_questions);

router.get('/getquestion', question_controller.get_question);

router.get('/findquestions', question_controller.find_questions);

module.exports = router;
