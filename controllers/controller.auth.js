const jwt = require('jsonwebtoken');

const {
  NODE_ENV,
  JWT_SECRET,
  URLS: { TOKEN_REDIRECT },
} = require('../constants');

const login = (accountId) => {
  return (req, res) => {
    const payload = {
      id: accountId || req.user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1w' });

    const tokenRedirectUrl =
      NODE_ENV === 'development' ? TOKEN_REDIRECT.LOCAL : TOKEN_REDIRECT.HEROKU;

    res.redirect(`${tokenRedirectUrl}${token}`);
  };
};

module.exports = {
  login,
};
