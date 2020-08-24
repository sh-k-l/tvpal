const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const {
  getSelf,
  getUserPublic,
  searchUsers,
  addUsername,
} = require('../controllers/controller.users');

const router = new Router();

// @route   GET /users/me
// @desc    Get details for current user
// @access  Private
router.get('/me', auth, getSelf);

// @route   GET /users/:username
// @desc    Get details for given user
// @access  Public
router.get('/:username', getUserPublic);

// @route   GET /users/search?q=
// @desc    Search users
// @access  Public
router.get('/search', searchUsers);

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
    check('username')
      .custom((value) => !/\s/.test(value))
      .withMessage('Username must not contain spaces'),
    check('username')
      .custom((value) => /^\w+$/.test(value))
      .withMessage('Username must only contain A-Z and 0-9 characters only'),
    auth,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    addUsername(req, res);
  }
);

module.exports = router;
