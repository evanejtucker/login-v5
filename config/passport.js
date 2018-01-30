const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../app/models/Users.js');
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

