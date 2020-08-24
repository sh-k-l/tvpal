const addOne = async (req, res) => {
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
        country: show.country,
        status: show.status,
      });
    }
    await req.user.save();
    res.status(200).json({ msg: 'OK' });
  } catch (error) {
    return res.status(400).json({ msg: 'Invalid shows. Shows require an id and name' });
  }
};

const reorderShows = async (req, res) => {
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
};

const removeOne = async (req, res) => {
  const index = req.user.shows.findIndex((s) => s._id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ msg: 'Show not found' });
  }
  req.user.shows.splice(index, 1);
  await req.user.save();
  res.status(200).json({ msg: 'OK' });
};

const toggleEpisodes = async (req, res) => {
  const { markAs, episodeIds } = req.body;

  if (!markAs || !episodeIds) {
    return res.status(422).json({ msg: 'Need markAs and episodeIds' });
  }

  const showIndex = req.user.shows.findIndex((show) => {
    return show._id === parseInt(req.params.id);
  });

  if (showIndex === -1) {
    return res.status(404).json({ msg: 'Show not found' });
  }

  episodeIds.forEach((episodeId) => {
    episodeId = parseInt(episodeId);
    if (markAs === 'seen') {
      if (!req.user.shows[showIndex].seenEpisodes.includes(episodeId)) {
        req.user.shows[showIndex].seenEpisodes.push(episodeId);
      }
    } else if (markAs === 'unseen') {
      const episodeIndex = req.user.shows[showIndex].seenEpisodes.indexOf(episodeId);
      if (episodeIndex !== -1) {
        req.user.shows[showIndex].seenEpisodes.splice(episodeIndex, 1);
      }
    } else {
      return res.status(422).json({ msg: 'markAs must be "seen" or "unseen"' });
    }
  });

  await req.user.save();
  res.status(200).json({ msg: 'OK' });
};

module.exports = {
  addOne,
  reorderShows,
  removeOne,
  toggleEpisodes,
};
