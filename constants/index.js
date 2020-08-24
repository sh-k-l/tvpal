const HEROKU_BASE = 'https://tv-pal-2020.herokuapp.com';
const LOCAL_BASE = 'http://localhost:3000';

const TOKEN_REDIRECT = '/app/auth?token=';

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URI: process.env.MONGODB_URI,
  URLS: {
    TOKEN_REDIRECT: {
      HEROKU: `${HEROKU_BASE}${TOKEN_REDIRECT}`,
      LOCAL: `${LOCAL_BASE}${TOKEN_REDIRECT}`,
    },
  },
  AUTH: {
    GOOGLE: {
      CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    },
    GITHUB: {
      CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
      CALLBACK_UR: process.env.GITHUB_CALLBACK_URL,
    },
  },
};
