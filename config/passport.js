const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const {
  AUTH: { GOOGLE, GITHUB },
} = require('../constants');

// Needed for Passport.js
passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

// For login via Google
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE.CLIENT_ID,
      clientSecret: GOOGLE.CLIENT_SECRET,
      callbackURL: GOOGLE.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        // Account already exists for this email
        if (user) {
          return done(null, user);
        }

        // Create new account
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        await user.save();

        done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

// For login via Github
passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB.CLIENT_ID,
      clientSecret: GITHUB.CLIENT_SECRET,
      callbackURL: GITHUB.CALLBACK_URL,
      scope: 'user:email',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        // Account already exists for this email
        if (user) {
          return done(null, user);
        }

        // Create new account
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        await user.save();

        done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

module.exports = {
  passport: passport,
};
