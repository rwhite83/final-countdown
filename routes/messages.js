const message_controller = require('../controllers/message_controller');
const user_controller = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.get('/send', function (req, res) {
    res.render('send');
});

// router.get('/allmessages', function (req, res) {
//     res.render('allmessages');
// });

// router.get('/allmessages', function (req, res) {
//     res.render('allmessages');
// });

router.get('/allmessages', message_controller.get_all_messages);

router.get('/gettargetmessages/:id', message_controller.get_target_messages);

router.get('/getmessages', message_controller.get_user_messages);

router.post('/createmessage', message_controller.create_message);

module.exports = router;
