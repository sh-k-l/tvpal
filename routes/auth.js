const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = new Router();

const URL_LOCAL = 'http://localhost:3000/app/auth?token=';
const URL_HEROKU = 'https://tv-pal-2020.herokuapp.com/app/auth?token=';

// @route   GET /auth/google
// @desc    Log in user via Google
// @access  Public
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  const payload = {
    id: req.user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' });

  if (process.env.NODE_ENV === 'development') {
    res.redirect(`${URL_LOCAL}${token}`);
  } else {
    res.redirect(`${URL_HEROKU}${token}`);
  }
});

// @route   GET /auth/github
// @desc    Log in user via Github
// @access  Public
router.get('/github', passport.authenticate('github'));
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/app' }),
  (req, res) => {
    const payload = {
      id: req.user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' });

    if (process.env.NODE_ENV === 'development') {
      res.redirect(`${URL_LOCAL}${token}`);
    } else {
      res.redirect(`${URL_HEROKU}${token}`);
    }
  }
);

// @route   GET /auth/guest
// @desc    Log in to guest account
// @access  Public
router.get('/guest', (req, res) => {
  const payload = {
    id: '5f283192d20542e28e74ddfa', // Hardcoded oopsie
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' });

  if (process.env.NODE_ENV === 'development') {
    res.redirect(`${URL_LOCAL}${token}`);
  } else {
    res.redirect(`${URL_HEROKU}${token}`);
  }
});

module.exports = router;
