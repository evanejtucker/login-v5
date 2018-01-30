const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/Users.js');
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                console.log('no user found');
                return done(null, false, {message: req.flash('loginMessage', 'Incorrect Username')});
            }
            if (user) {
                if(user.validPassword(password, user.password)) {
                    console.log('user exists');
                    return done(null, user);
                } else {
                    return done(null, false, {message: req.flash('loginMessage', 'Incorrect Password')});
                }
            }
        });
    }
));

module.exports = {
    passport: passport,
    isLoggedIn: (req, res, next)=> {
        if(req.isAuthenticated()){
            console.log('user authenticated');
            next();
        } else{
            console.log("user not authenticated");
            res.redirect('/')
        }
    },
    logoutUser: (req, res, next)=> {
        if(req.isAuthenticated()){
            req.logout();
            next();
        } else {
            next();
        }
    }
}

