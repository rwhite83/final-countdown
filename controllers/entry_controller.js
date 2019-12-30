const model = require('../models/final_countdown_model');
const cookieSession = require('cookie-session');

exports.add_entry = (req, res) => {
    let email = cookieSession.userEmail;
    console.log('add task fired from task controller');
    model.add_entry(req.body, email, function () {
        res.redirect('/');
    })
};