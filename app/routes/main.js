const express = require('express');
const router = express.Router();
const User = require('../models/Users.js');

// define the home page route
router.get('/', (req, res, next)=> {
  res.render('pages/index.ejs', {name: 'Evan'});
});
// define the about route
router.get('/about', (req, res, next)=> {
  res.send('About page')
});

router.post('/login', (req, res, next)=> {
  console.log(req.body);
  res.send("hello world");
});

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
  newUser.save((err, user)=> {
    console.log(user);
  });
  res.send("hello world");
});

module.exports = router;