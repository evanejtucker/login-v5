var express = require('express')
var router = express.Router()


// define the home page route
router.get('/', (req, res, next)=> {
  res.render('pages/index.ejs', {name: 'Evan'});
});
// define the about route
router.get('/about', (req, res, next)=> {
  res.send('About page')
});

router.post('/addUser', (req, res, next)=> {
  res.send(req);
});

router.post('/login', (req, res, next)=> {
  res.send(req);
});

module.exports = router;