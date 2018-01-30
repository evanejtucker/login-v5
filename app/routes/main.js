const express = require('express');
const router = express.Router();
const User = require('../models/Users.js');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

// define the home page route
router.get('/', (req, res, next)=> {
  res.render('pages/index.ejs', {name: 'Evan'});
});
// define the about route
router.get('/about', (req, res, next)=> {
  res.send('About page')
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/profile',
                                   failureRedirect: '/'})
);

router.post('/newUser', (req, res, next)=> {
  let info = req.body;
  let newUser = new User({
    firstname: info.firstname, 
    lastname: info.lastname,
    username: info.newUsername,
    password: info.confirmPassword,
    email: info.email,
    admin: false
  });
  newUser.password = newUser.generateHash(info.confirmPassword);
  
  newUser.save((err, user)=> {
    console.log(user);
  });
  res.redirect("/login");
});

module.exports = router;