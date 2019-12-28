const db = require('../utilities/db_access');
const mysql = require('mysql');
const cookieSession = require('cookie-session');

function login_user(data, callback){
    // console.log(data);
    let user = {
        userEmail: data.email_attempt,
        userPassword: data.password_attempt
    };
    console.log(user.userEmail);
    let sql = "SELECT * FROM userProfile WHERE userEmail = " + "'" + user.userEmail + "'";
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        callback(result);
    });
}

function signup_user(data){
    console.log(data.firstname);
    let user = {
        userFirstName: data.firstname,
        userLastName: data.lastname,
        userEmail: data.email,
        userPassword: data.password1,
        userBio: data.about,
        userImageURL: data.imageurl,
        userCountry: data.country,
        userDOB: data.dob
    };
    let sql = 'INSERT INTO userProfile SET ?';
    db.query(sql, user, (err, result) =>{
        console.log(err);
        // this has been uncommented, if it breaks this might be why
        if(err) throw err;
        console.log("Lewis is barking from signup user model: " + result);
    });
}

function getUser(id, callback){
    let sql = 'Select * FROM userProfile where userID = ' + id;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(err)
        console.log("Lewis is barking from getUser - model");
        console.log(result);
        return callback(result);
    });
}

function getUserProfile(callback) {
    let id = cookieSession.userID;
    console.log("sess test" + id);
    let sql = "Select * FROM userProfile LEFT JOIN userPost ON userProfile.userID = userPost.userID WHERE userProfile.userID = '" + id + "'";
    let posts = [];

    // all posts
    db.query(sql, (err, results) => {
        if(err) throw err;
        
        // each post
        results.forEach(resultPost => {
            
            
            getReplies(resultPost.postID, function (resultReplies) {
                let resultObj = {
                    'post' : resultPost,
                    'replies' : resultReplies
                }
                posts.push(resultObj);
            });

        })
            setTimeout(()=>{
                // console.log("PLEASE WORK")
                // console.log(posts[1].replies);
               return callback(posts);
        }, 500)
    });
}

function getJustUserProfile(callback) {
    let id = cookieSession.userID;
    let sql = 'Select * FROM userProfile WHERE userProfile.userID = ' + id;
    db.query(sql, (err, results) => {
        if(err) throw err;
        return callback(results);
    });
}

function getReplies(postID, callback) {
    let sql = 'Select * FROM userPost RIGHT JOIN userComment ON userPost.postID = userComment.postID WHERE userComment.postID = ' + postID;
    db.query(sql, (err, results) => {
        if(err) throw err;
        return callback(results);
    });
}

function updateUser(data, callback){
    let id = cookieSession.userID
    let user = {
        userFirstName: data.firstname,
        userLastName: data.lastname,
        userEmail: data.email,
        userBio: data.about,
        userImageURL: data.url,
        userCountry: data.country,
        userDOB: data.dob
    };
    console.log('data being sent to db: ' + user.userFirstName);
    let sql = "UPDATE userProfile SET ? WHERE userID = '" + id + "'";
    db.query(sql, user,(err, result) =>{
        if(err) throw err;
        console.log(err);
        return callback();
    });
}

function getAllMessages(callback) {
    let id = cookieSession.userID;
    let sql = "Select * FROM userMessage JOIN userProfile ON userProfile.userID = userMessage.messageSender OR userProfile.userID = userMessage.messageReceiver GROUP BY userID";
    db.query(sql, (err, results) => {
        if(err) throw err;
        return callback(results);
    });
}

function getTargetMessages(target, callback) {
    let id = cookieSession.userID;
    let sql = "Select * FROM userMessage JOIN userProfile ON userProfile.userID = userMessage.messageSender OR userProfile.userID = userMessage.messageReceiver ORDER BY messageDate";
    db.query(sql, (err, results) => {
        if(err) throw err;
        return callback(results);
    });
}

function searchPosts(target, subject, callback) {
    console.log("search posts model successfully queried");
    let sql = "Select * FROM userPost JOIN userProfile ON userProfile.userID = userPost.userID WHERE userPost.message LIKE '%" + target + "%' AND userPost.tag = '" + subject + "'";
    db.query(sql, (err, results) => {
        if(err) throw err;
        return callback(results);
    });
}

function postQuestion(data) {
    let id = cookieSession.userID
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getUTCDay();
    let sqlDate = "" + year + "-" + month + "-" + day
    console.log(sqlDate)
    let post = {
        userID: id,
        subject: data.subject,
        message: data.message,
        postDate: sqlDate,
        replyCount: 0,
        tag: data.tag
    };
    let sql = 'INSERT INTO userPost SET ?';
    db.query(sql, post, (err, result) =>{
        console.log(err);
        if(err) throw err;
        console.log("Lewis is barking from signup user model: " + result);
    });
}

module.exports = {
    login: login_user,
    create: signup_user,
    getuser: getUser,
    getuserprofile: getUserProfile,
    updateuser: updateUser,
    getreplies: getReplies,
    getjustprofile: getJustUserProfile,
    getallmessages: getAllMessages,
    gettargetmessages: getTargetMessages,
    searchposts: searchPosts,
    postquestion: postQuestion
}