module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Server Error. Please try again later.' });
};
