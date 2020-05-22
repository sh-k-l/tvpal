const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
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
