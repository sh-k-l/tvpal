const User = require('../models/User');

const getSelf = (req, res) => {
  res.json(req.user.getPublic());
};

const getUserPublic = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ msg: 'User does not exist' });
  }

  const out = {
    name: user.name,
    username: user.username,
    shows: user.shows.map((s) => ({
      id: s.id,
      name: s.name,
      image: s.image,
      imdb: s.imdb,
    })),
  };

  res.json(out);
};

const searchUsers = async (req, res) => {
  if (!req.query.q) return res.status(200).json([]);
  //TODO
};

const addUsername = async (req, res) => {
  const { username } = req.body;

  const check = await User.findOne({ username });
  if (check) {
    return res.status(400).json({ msg: 'Username already taken' });
  }

  req.user.username = username;
  await req.user.save();

  res.status(200).json({ status: 'ok' });
};

module.exports = {
  getSelf,
  getUserPublic,
  searchUsers,
  addUsername,
};
