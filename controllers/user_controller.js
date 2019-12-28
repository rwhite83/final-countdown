const model = require('../models/knowledge_base_model');
const cookieSession = require('cookie-session');

exports.get_user_details = (req, res) => {
    console.log('get user details fired from user controller');
    // query user_model (database) from here and return results
    res.end();
};

exports.login_user = (req, res) => {
    console.log('login user fired from user controller');

    let email = req.body.email_attempt;
    let password = req.body.password_attempt;

    // query user_model (database) from here and return results
    console.log('attempting db query')
    model.login(req.body, function (result) {
        console.log("login user result: " + result);
        let userPW = result[0].userPassword;        
        if (userPW.localeCompare(password) != 0) {
            console.log('Invalid password');
        } else {
            // assuming user exists and password matches...
            cookieSession.userID = result[0].userID;
            cookieSession.userEmail = result[0].userEmail;
            console.log('session userId now: ' + cookieSession.userID);
            console.log('session userEmail now: ' + cookieSession.userEmail);
            let id = cookieSession.userID;
            console.log(id);
                res.redirect('/home')
        }
    })
};

exports.logout_user = (req, res) => {
    console.log('logout user fired from user controller');
    cookieSession.userID = '';
    cookieSession.userEmail = '';
    res.redirect('/');
};

exports.create_user = (req, res) => {
    console.log('create user fired from user controller');
    console.log(req.body);
    let pw1 = req.body.password1;
    let pw2 = req.body.password2;
    if (pw1.localeCompare(pw2) == 0) {
        model.create(req.body, function (model_response) {
                console.log(model_response);
            }
        )
    }
    res.redirect('/home');
};

exports.getUser = (req,res,next) => {
    let id = req.params.id;
    //let id = req.session.userID;
    console.log(id);
    model.getuser(id, function(result) {
        if(result.length == 1){
            console.log("Lewis is barking from get user exports");
            console.log(result[0]);
            // Create an object to save the data
            let user = {
                'firstName': result[0].userFirstName,
                'lastName': result[0].userLastName,
                'email': result[0].userEmail,
                'bio': result[0].userBio,
                'url': result[0].userImageURL,
                'country': result[0].userCountry,
                'dob': result[0].userDOB,
                'likes': result[0].userLikeCount,
                'posts': result[0].userPostCount
            }
            res.render('otherprofile', { "data": user} );
        }
    });
}

exports.getUserProfile = (req, res, next) =>{
    id = req.session.userID;
    let posts = [];
    let postsLewis = [];
    let repliesLewis = [];
    let image;
    model.getuserprofile(function(results) {
        let post_array = [];
        image = results[0].post.userImageURL
        let user = {
            'firstName': results[0].post.userFirstName,
            'lastName': results[0].post.userLastName,
            'email': results[0].post.userEmail,
            'bio': results[0].post.userBio,
            'url': results[0].post.userImageURL,
            'country': results[0].post.userCountry,
            'dob': results[0].post.userDOB,
            'likes': results[0].post.userLikeCount,
            'postsCount': results[0].post.userPostCount
        }
        results.forEach(resultPost => {
            console.log("RESULT!");
            console.log(resultPost);
            // let postID = resultPost.postID;
            // let joined_return = [];
            // let replies = [];
            let post = {
                'subject': resultPost.post.subject,
                'message': resultPost.post.message,
                'date': resultPost.post.postDate,
                'replyCount': resultPost.post.replyCount,
                'tag': resultPost.post.tag,    
                'img' : image,
                'replies' : resultPost.replies
            }

            console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            console.log(post);
            postsLewis.push(post);
            // model.getreplies(postID, function (results) {
            //    results.forEach(result =>{
            //         let reply = {
            //             'message': result.commentMessage,
            //         }
            //         console.log("results from getReplies:"  + result.commentMessage);
            //         replies.push(reply)
            //         console.log("reply from getReplies: ");
            //         console.log("THIS IS THE REPLY: ");
            //         console.log(reply);
            //         repliesLewis.push(reply);
            //    })
            // })
        });
        setTimeout(() =>{
            res.render('myprofile', { "data": user , "posts": posts, "postsLewis": postsLewis} );
        }, 500);
    });
}

exports.getHome = (req, res, next) =>{
    id = req.session.userID;
    let posts = [];
    let postsLewis = [];
    let repliesLewis = [];
    let image;
    model.getuserprofile(function(results) {
        let post_array = [];
        image = results[0].post.userImageURL
        let user = {
            'firstName': results[0].post.userFirstName,
            'lastName': results[0].post.userLastName,
            'email': results[0].post.userEmail,
            'bio': results[0].post.userBio,
            'url': results[0].post.userImageURL,
            'country': results[0].post.userCountry,
            'dob': results[0].post.userDOB,
            'likes': results[0].post.userLikeCount,
            'postsCount': results[0].post.userPostCount
        }
        results.forEach(resultPost => {
            console.log("RESULT!");
            console.log(resultPost);
            // let postID = resultPost.postID;
            // let joined_return = [];
            // let replies = [];
            let post = {
                'subject': resultPost.post.subject,
                'message': resultPost.post.message,
                'date': resultPost.post.postDate,
                'replyCount': resultPost.post.replyCount,
                'tag': resultPost.post.tag,    
                'img' : image,
                'replies' : resultPost.replies
            }

            console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            console.log(post);
            postsLewis.push(post);
            // model.getreplies(postID, function (results) {
            //    results.forEach(result =>{
            //         let reply = {
            //             'message': result.commentMessage,
            //         }
            //         console.log("results from getReplies:"  + result.commentMessage);
            //         replies.push(reply)
            //         console.log("reply from getReplies: ");
            //         console.log("THIS IS THE REPLY: ");
            //         console.log(reply);
            //         repliesLewis.push(reply);
            //    })
            // })
        });
        setTimeout(() =>{
            res.render('myprofile', { "data": user , "posts": posts, "postsLewis": postsLewis} );
        }, 500);
    });
}

exports.populateEditProfile = (req, res, next) =>{
    id = req.session.userID;
    console.log(id);
    model.getjustprofile(function(results) {
        let user = {
            'firstName': results[0].userFirstName,
            'lastName': results[0].userLastName,
            'email': results[0].userEmail,
            'bio': results[0].userBio,
            'url': results[0].userImageURL,
            'country': results[0].userCountry,
            'dob': results[0].userDOB.toISOString().substring(0, 10),
            'likes': results[0].userLikeCount,
            'posts': results[0].userPostCount
        }
        res.render('edit-profile', { "data": user } );
    });
}

exports.updateUser = (req, res, next) =>{
    model.updateuser(req.body, function(err){
        if(err) throw err;
    });
    res.redirect('/myprofile');
}