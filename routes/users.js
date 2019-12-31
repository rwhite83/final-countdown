const user_controller = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.post('/login', user_controller.login_user);

router.post('/logout', user_controller.logout_user);

router.post('/signup', user_controller.signup_user);

module.exports = router;
