var express = require('express')
var router = express.Router()


// define the home page route
router.get('/', function (req, res) {
  res.render('pages/index.ejs', {name: 'Evan'});
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About page')
})

module.exports = router