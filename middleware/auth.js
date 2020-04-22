const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('tvpal-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({ msg: 'User does not exist' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid auth token' });
  }
};
