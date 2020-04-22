const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid');
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

module.exports = {
  passport: passport,
};
