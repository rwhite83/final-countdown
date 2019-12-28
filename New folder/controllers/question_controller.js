const model = require('../models/knowledge_base_model');

exports.post_question = (req, res) => {
    console.log('post question fired from question controller');
    // query question_model (database) from here and return results
    let question = req.body.question;
    let subject = req.body.subject;
    let tag = req.body.tag;
    console.log("question: " + question + ", subject: " + subject + ", tag: " + tag);
    model.postquestion(req.body);
        res.redirect('/home');
};

exports.get_user_questions = (res) => {
    console.log('get user questions fired from question controller');
    // query question_model (database) from here and return results
    res('miracle');
    //and then a miracle happened
};

exports.get_question = (req, res) => {
    console.log('get question fired from question controller');
    // query question_model (database) from here and return results
    res.end();
};

exports.find_questions = (req, res) => {
    console.log('find questions fired from question controller');
    // query question_model (database) from here and return results
    res.end();
};

exports.search = (req, res) => {
    console.log('search fired from question controller');
    // query question_model (database) from here and return results
    let target = req.body.target
    let topic = req.body.topic
    console.log("target: " + target + ", topic: " + topic);
    model.searchposts(target, topic, function (results) {
        console.log(results);
        let search_results = [];
        for (let i = 0; i < results.length; i++) {
            let posts = {
                'userID': results[i].userID,
                'userFirstName': results[i].userFirstName,
                'userLastName': results[i].userLastName,
                'img': results[i].userImageURL,
                'date': results[i].postDate.toISOString().substring(0, 10),
                'message': results[i].message,
                'subject': results[i].subject,
                'replyCount': results[i].replyCount
            }
            search_results.push(posts);
        }
        res.render('search-results', { "posts": search_results });
    });
};