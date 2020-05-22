const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = new Router();

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
    res.redirect(`http://localhost:3000/app/auth?token=${token}`);
  } else {
    res.redirect(`https://tv-pal-2020.herokuapp.com/app/auth?token=${token}`);
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
      res.redirect(`http://localhost:3000/app/auth?token=${token}`);
    } else {
      res.redirect(`https://tv-pal-2020.herokuapp.com/app/auth?token=${token}`);
    }
  }
);

module.exports = router;
