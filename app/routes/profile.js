const express = require('express');
const router = express.Router();
const auth = require('../../config/passport.js')


// define the home page route
router.get('/', function (req, res, next) {
  res.render('pages/profile.ejs', {user: req.user})
});

router.get('/logout', auth.logoutUser, (req, res, next)=> {
  console.log('successfully logged out!')
  res.redirect('/');
});

module.exports = router