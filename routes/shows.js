const { Router } = require('express');
const auth = require('../middleware/auth');

const router = new Router();

// @route   POST /shows
// @desc    Add shows to account
// @access  Private
router.post('/', auth, async (req, res) => {
  const { shows } = req.body;

  try {
    for (let show of shows) {
      const index = req.user.shows.findIndex((s) => s._id === show.id);

      if (index !== -1) {
        return res
          .status(422)
          .json({ msg: `Duplicate show (${show.id}). Shows must not already be in list.` });
      }

      req.user.shows.push({
        _id: show.id,
        name: show.name,
        imdb: show.imdb,
        image: show.image,
      });
    }
    await req.user.save();
    res.status(200).json({ msg: 'OK' });
  } catch (error) {
    return res.status(400).json({ msg: 'Invalid shows. Shows require an id and name' });
  }
});

// @route   DELETE /shows/:id
// @desc    Remove show from list
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  const index = req.user.shows.findIndex((s) => s._id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ msg: 'Show not found' });
  }
  req.user.shows.splice(index, 1);
  await req.user.save();
  res.status(200).json({ msg: 'OK' });
});

// @route   PATCH /shows
// @desc    Reorder list of shows. Expects an array of show ids for new order.
// @access  Private
router.patch('/', auth, async (req, res) => {
  const { order } = req.body;
  if (order.length !== req.user.shows.length) {
    return res.status(422).json({
      msg: `Order array (${order.length}) must have same length as show array (${req.user.shows.length})`,
    });
  }

  // Is there a better way to handle reordering this list?
  const reordered = [];
  for (let id of order) {
    const index = req.user.shows.findIndex((s) => s._id === id);
    if (index === -1) {
      return res
        .status(422)
        .json({ msg: `Order array contains show ID (${id}) that does not exist in show array` });
    }
    reordered.push(req.user.shows[index]);
  }

  req.user.shows = reordered;
  await req.user.save();
  res.status(200).json({ msg: 'OK' });
});

module.exports = router;
