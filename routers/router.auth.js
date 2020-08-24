const { Router } = require('express');
const passport = require('passport');

const { login } = require('../controllers/controller.auth');

const router = new Router();

// @route   GET /auth/google
// @desc    Log in user via Google
// @access  Public
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), login());

// @route   GET /auth/github
// @desc    Log in user via Github
// @access  Public
router.get('/github', passport.authenticate('github'));
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/app' }),
  login()
);

// @route   GET /auth/guest
// @desc    Log in to guest account
// @access  Public
router.get('/guest', login('5f283192d20542e28e74ddfa'));
module.exports = router;
