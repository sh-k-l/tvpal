const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

const router = new Router();

// @route   GET /users/me
// @desc    Get details for current user
// @access  Private
router.get('/me', auth, (req, res) => {
  res.json(req.user.getPublic());
});

// @route   GET /users/:username
// @desc    Get details for given user
// @access  Public
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ msg: 'User does not exist' });
  }

  res.json(user.getPublic());
});

// @route   PATCH /users/addusername
// @desc    Add username to user
// @access  Private
router.patch(
  '/addusername',
  [
    check('username', 'Username must be between 3 and 15 characters long.').isLength({
      min: 3,
      max: 15,
    }),
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username } = req.body;

    const check = await User.findOne({ username });
    if (check) {
      return res.status(400).json({ msg: 'Username already taken' });
    }

    req.user.username = username;
    req.user.save();

    res.status(200).json({ status: 'ok' });
  }
);

module.exports = router;
