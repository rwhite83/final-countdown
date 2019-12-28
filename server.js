const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

// set this back to 1000
const TWO_HOURS = 10000 * 60 * 60 * 2;

const home = require('./routes/home');
const users = require('./routes/users');
const messages = require('./routes/messages');
const questions = require('./routes/questions');

app.use(cookieSession({
    name: 'session',
    keys: ['wubbalubbadubdub'],
    maxAge: TWO_HOURS
  }))

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', home);
app.use('/users', users);
app.use('/messages', messages);
app.use('/questions', questions);

console.log('server launched on port 80 for heroku')
app.set('port', process.env.PORT || 80);


/// Adding tables to the data base.. useful functions:

// get the client
const mysql2 = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql2.createPool({
  host: 'sql3.freemysqlhosting.net',
  user: 'sql3313427',
  database: 'sql3313427',
  password: 'Kp8X2AFEzK'
});

// Drop userProfileTable mysql2
app.get('/dropUserProfileTable', (req, res) => {
  let sql = 'DROP TABLE userProfile';
  pool.query(sql, function(err, rows, fields) {
      // Connection is automatically released when query resolves
      if(err) throw err;
      console.log(rows);
  });
  res.send('UserProfile Table dropped...');
});

// Create UserProfile table mysql2
app.get('/createUserProfileTable', (req, res) => {
  let sql = 'CREATE TABLE userProfile(userID int AUTO_INCREMENT'
      + ', userFirstName VARCHAR(255)'
      + ', userLastName VARCHAR(255)'
      + ', userEmail VARCHAR(255)'
      + ', userPassword VARCHAR(255)'
      + ', userBio VARCHAR(255)'
      + ', userImageURL VARCHAR(255)'
      + ', userCountry VARCHAR(100)'
      + ', userDOB DATE'
      + ', userLikeCount int'
      + ', userPostCount int'
      + ', PRIMARY KEY(userID))';
  pool.query(sql, function(err, rows, fields) {
      // Connection is automatically released when query resolves
      if(err) throw err;
      console.log(rows);
  });
  res.send('UserProfile Table created...');
});

// Drop userPost Table mysql2
app.get('/dropUserPostTable', (req, res) => {
  let sql = 'DROP TABLE userPost';
  pool.query(sql, function(err, rows, fields) {
      // Connection is automatically released when query resolves
      if(err) throw err;
      console.log(rows);
  });
  res.send('UserPost Table dropped...');
});

// Create userpost table mysql2
app.get('/createUserPostTable', (req, res) => {
  let sql = 'CREATE TABLE userPost(postID int AUTO_INCREMENT'
      + ', userID int'
      + ', subject VARCHAR(255)'
      + ', message VARCHAR(255)'
      + ', postDate DATE'
      + ', replyCount int'
      + ', tag VARCHAR(255)'
      + ', FOREIGN KEY(userID) REFERENCES userProfile(userID)'
      + ', PRIMARY KEY(postID))';
  pool.query(sql, function(err, rows, fields) {
      // Connection is automatically released when query resolves
      if(err) throw err;
      console.log(rows);
  });
  res.send('UserPost Table created...');
});

// Insert Post
app.get('/addPost', (req,res) => {
  // dummy data
  let now = new Date();
  let post = {
      userID: '1',
      subject: 'Help with C',
      message: 'How do you run your code in C?',
      postDate: now,
      replyCount: '0',
      tag: 'C'
  };
  let sql = 'INSERT INTO userPost SET ?';
  // The question mark from line 61 is a placeholder for the second argument of the query function
  pool.query(sql, post, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Post added...');
  })
});

// Create usercomment table mysql2
app.get('/createUserCommentTable', (req, res) => {
  let sql = 'CREATE TABLE userComment(commentID int AUTO_INCREMENT'
      + ', postID int'
      + ', userID int'
      + ', message VARCHAR(255)'
      + ', postDate DATE'
      + ', FOREIGN KEY(userID) REFERENCES userProfile(userID)'
      + ', FOREIGN KEY(postID) REFERENCES userPost(postID)'
      + ', PRIMARY KEY(commentID))';
  pool.query(sql, function(err, rows, fields) {
      // Connection is automatically released when query resolves
      if(err) throw err;
      console.log(rows);
  });
  res.send('UserComment Table created...');
});

// Insert Comment
app.get('/addComment', (req,res) => {
  // dummy data
  let now = new Date();
  let comment = {
      userID: '4',
      postID: '1',
      message: 'A constructor in Java is a special method that is used to initialize objects. The constructor is called when an object of a class is created.',
      postDate: now
  };
  let sql = 'INSERT INTO userComment SET ?';
  // The question mark from line 61 is a placeholder for the second argument of the query function
  pool.query(sql, comment, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Comment added...');
  })
});

// Drop userComment Table mysql2
app.get('/dropUserCommentTable', (req, res) => {
  let sql = 'DROP TABLE userComment';
  pool.query(sql, function(err, rows, fields) {
      // Connection is automatically released when query resolves
      if(err) throw err;
      console.log(rows);
  });
  res.send('UserComment Table dropped...');
});