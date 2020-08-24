require('dotenv').config();
require('express-async-errors');

const path = require('path');
const express = require('express');

const { PORT, NODE_ENV } = require('./constants');
const errorHandler = require('./middleware/errorHandler');
const setupMiddleware = require('./middleware');
const { authRouter, userRouter, showsRouter } = require('./routers');
const connectToDatabase = require('./config/db');

const app = express();

setupMiddleware(app);
connectToDatabase();

// app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', authRouter);
app.use('/api/shows', showsRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

if (NODE_ENV === 'production') {
  app.use('/app/static', express.static(path.join(__dirname, 'client/build/static')));
  app.use('/app/icon', express.static(path.join(__dirname, 'client/build/icon')));
  app.get(['/app', '/app/*'], (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, './client/build/') });
  });
  app.get('/', (req, res) => {
    res.redirect('/app');
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT} (${NODE_ENV})`));
