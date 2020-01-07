const model = require('../models/final_countdown_model');
const cookieSession = require('cookie-session');

exports.add_entry = (req, res) => {
    let email = req.session.userEmail;
    console.log('add task fired from task controller');
    model.add_entry(req.body, email, function () {
        console.log(req.body.new_entry_datetime)
        res.redirect('/');
    })
};

exports.get_user_entries = (req, callback) => {
    console.log('get user entries fired from task controller');
    let email = req.session.userEmail;
    model.get_entries(email, function(model_response) {
        // var targetDate = new Date(model_response[0].entryDate)
        // console.log('entries1 ' + targetDate)
        // let correction = targetDate.getTimezoneOffset()
        // targetDate.setMinutes(targetDate.getMinutes() + targetDate.getTimezoneOffset())
        // console.log('entries2 ' + targetDate)
        callback(model_response);
    })
};