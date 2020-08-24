const { json, urlencoded } = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('../config/passport').passport;

const setupMiddleware = (app) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan('tiny'));
  // app.use(helmet());
  app.use(passport.initialize());
};

module.exports = setupMiddleware;
