const model = require('../models/final_countdown_model');
const cookieSession = require('cookie-session');

exports.add_entry = (req, res) => {
    let email = req.session.userEmail;
    console.log('delete task fired from task controller');
    model.add_entry(req.body, email, function () {
        console.log(req.body.new_entry_datetime)
        res.redirect('/');
    })
};

exports.delete_entry = (req, res) => {
    console.log('delete entry fired from task controller');
    console.log(req.body.message)
    model.delete_entry(req.body.message, function () {
        console.log('heard back from database for deletion')
        res.redirect('/');
    })
};

exports.get_user_entries = (req, callback) => {
    console.log('get user entries fired from task controller');
    let email = req.session.userEmail;
    model.get_entries(email, function(model_response) {
        for(let i =  0; i < model_response.length; i++) {
            let stripped_date = model_response[i].entryDate.toString().slice(0, 21);
            model_response[i].strippedDate = stripped_date
        }
        callback(model_response);
    })
};