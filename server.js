// dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const main = require('./app/routes/main.js');
const profile = require('./app/routes/profile.js');
const mongoose = require('mongoose');
const User = require('./app/models/Users.js');
const path = require('path');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const auth = require('./config/passport.js');
const DB = require('./config/db.js');

// middleware
app.use(express.static('./app/public'));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

// mongoose
// mongoose.connect('mongodb://localhost/login-v5');
// mongoose.connect(DB.info, (error)=> {
//   if(error) throw error;
// });
mongoose.connect('mongodb://dbuser1:c0l0rad0@ds047030.mlab.com:47030/login-app', (error)=> {
  if(error) throw error;
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("successfully connected to db");
});

// routes
app.use('/', main);
app.use('/profile', auth.isLoggedIn, profile);

app.listen(port, ()=> {
    console.log(`app listening on port ${port}!`)
});
