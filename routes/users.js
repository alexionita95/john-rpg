const express = require('express');
const User = require('../users/user');
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();
router.get('/login', (req, res, next) => {
    res.render('login');

});
// Post login data
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.send({success:true});
        }else {
            // if the login function returns null send this error message back to the user.
            res.send({success:false, message:'Username/Password incorrect!' });
            //res.send('Username/Password incorrect!');
        }
    })

});

router.get('/register', (req, res, next) => {
    res.render('register');

});
// Post register data
router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            if(lastId.error && lastId.error === true){
                res.send({success:false, message:"DB is bullshit again..."});
            }
            else{
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.send({success:true});
            });
        }

        }else {
            res.send({success:false, message:"Error creating a new user ..."});
        }
    });

});


// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;