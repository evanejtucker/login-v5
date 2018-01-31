const express = require('express');
const router = express.Router();
const auth = require('../../config/passport.js')


// define the home page route
router.get('/', function (req, res) {
  res.render('pages/profile.ejs', {user: req.user})
});

module.exports = router