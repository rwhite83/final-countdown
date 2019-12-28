const model = require('../models/knowledge_base_model');
const cookieSession = require('cookie-session');

exports.get_user_messages = (req, res) => {
    console.log('get user messages fired from message controller');
    // query message_model (database) from here and return results
    res.end();
};

exports.create_message = (req, res) => {
    console.log('create message fired from message controller');
    // query message_model (database) from here and return results
    res.end();
};

exports.get_target_messages = (req, res) => {
    let test = req.params.id;
    console.log('get all message fired from message controller with param ' + test);
    // query message_model (database) from here and return results
    message_history = []
    model.gettargetmessages(test, function(results) {
        for (let i = 0; i < results.length; i++) {
            let time = results[i].messageDate.getTime()
            let user = {
                'userID': results[i].userID,
                'userFirstName': results[i].userFirstName,
                'userLastName': results[i].userLastName,
                'userImage': results[i].userImageURL,
                'messageDate': results[i].messageDate.toISOString().substring(0, 10),
                'messageTime': time,
                'messageContent': results[i].messageContent
            }
            message_history.push(user);
        }
        console.log("message history: " + message_history)
    });
    messaged_users = []
    model.getallmessages(function (results) {
        for (let i = 0; i < results.length; i++) {
            let user = {
                'userID': results[i].userID,
                'userFirstName': results[i].userFirstName,
                'userLastName': results[i].userLastName,
                'userImage': results[i].userImageURL,
                'messageDate': results[i].messageDate.toISOString().substring(0, 10),
                'messageCount': results[i].userLikeCount
            }
            messaged_users.push(user);
        }
        console.log("messgaed users: " + messaged_users);
        res.render('allmessages', { 'people': messaged_users, 'messages': message_history })
    })
};

exports.get_all_messages = (req, res) => {
    console.log('get all message fired from message controller');
    // query message_model (database) from here and return results
    let messaged_users = []
    model.getallmessages(function (results) {

        for (let i = 0; i < results.length; i++) {
            let user = {
                'userID': results[i].userID,
                'userFirstName': results[i].userFirstName,
                'userLastName': results[i].userLastName,
                'userImage': results[i].userImageURL,
                'messageDate': results[i].messageDate.toISOString().substring(0, 10),
            }
            messaged_users.push(user);
        }
        console.log(messaged_users);
        res.render('allmessages', { 'people' : messaged_users })
    })
};