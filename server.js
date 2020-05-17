require('dotenv').config();
require('express-async-errors');

const path = require('path');
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./routes/auth');
const shows = require('./routes/shows');
const users = require('./routes/users');
const passport = require('./config/passport').passport;
const connectToDatabase = require('./config/db');

const app = express();
connectToDatabase();

app.use(express.json());
app.use(passport.initialize());

// app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', auth);
app.use('/api/shows', shows);
app.use('/api/users', users);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/app/*', (req, res) => {
    console.log('sending index file');
    // res.sendFile(path.resolve(__dirname, '/client/build/index.html'));
    res.sendFile('index.html', { root: path.join(__dirname, './client/build/') });
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} ${process.env.NODE_ENV}`));
