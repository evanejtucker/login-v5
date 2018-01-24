// dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const main = require('./app/routes/main.js');
const profile = require('./app/routes/profile.js');
const mongoose = require('mongoose');
const path = require('path');

// middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./app/public'));

// mongoose
mongoose.connect('mongodb://localhost/login-v5');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("successfully connected to db");
});

// routes
app.use('/', main);
app.use('/profile', profile);

app.listen(port, ()=> {
    console.log(`app listening on port ${port}!`)
});