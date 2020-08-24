const { Router } = require('express');
const auth = require('../middleware/auth');
const {
  addOne,
  reorderShows,
  removeOne,
  toggleEpisodes,
} = require('../controllers/controller.shows');

const router = new Router();

// @route   POST /shows
// @desc    Add shows to account
// @access  Private
router.post('/', auth, addOne);

// @route   PATCH /shows
// @desc    Reorder list of shows. Expects an array of show ids for new order.
// @access  Private
router.patch('/', auth, reorderShows);

// @route   DELETE /shows/:id
// @desc    Remove show from list
// @access  Private
router.delete('/:id', auth, removeOne);

// @route   PATCH /shows/:id
// @desc    Mark episodes as seen or unseen
// @access  Private
router.patch('/:id/episodes', auth, toggleEpisodes);

module.exports = router;
