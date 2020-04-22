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

  res.json({
    token,
    name: req.user.name,
    email: req.user.email,
    shows: req.user.shows,
    username: req.user.username,
  });
});

module.exports = router;
