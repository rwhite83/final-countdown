const user_controller = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

// only still here to serve looking at login pug

// router.get('/login', function (req, res, next) {
//     res.render('login');
// });


// only still here to serve looking at update pug
router.get('/update', function (req, res) {
    let userDetails = function (cb) {
        let user = user_controller.get_user_details;
        cb(user);
    }
    res.end();
    //res.render('update');
});

// router.get('/edit-profile', function (req, res, next) {
//     console.log('hey there sailor');
//     res.render('edit-profile');

// });


router.get('/edit-profile', user_controller.populateEditProfile);

router.post('/update-user', user_controller.updateUser);


// router.post('/edit-profile', function(req, res){
//     console.log(res);
// })

// only still here to serve looking at myprofile pug
// router.get('/myprofile', function (req, res) {
//     res.render('myprofile');
// });

router.get('/myprofile/:id', user_controller.getUser);

router.post('/login', user_controller.login_user);

router.post('/logout', user_controller.logout_user);

router.post('/signup', user_controller.create_user);

router.get('/userdetails', user_controller.get_user_details);

module.exports = router;
