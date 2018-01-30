var express = require('express')
var router = express.Router()


// define the home page route
router.get('/', function (req, res) {
  console.log(req.user);
  res.render('pages/profile.ejs', {user: req.user})
});

module.exports = router