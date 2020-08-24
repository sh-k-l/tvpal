const { json, urlencoded } = require('express');
const helmet = require('helmet');
const passport = require('../config/passport').passport;
const { NODE_ENV } = require('../constants');

const setupMiddleware = (app) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  if (NODE_ENV == 'development') {
    app.use(require('morgan')('tiny'));
  }
  app.use(passport.initialize());
};

module.exports = setupMiddleware;
