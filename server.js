require('dotenv').config();
require('express-async-errors');

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

app.get('/', (req, res) => res.send('API Running'));
app.use('/auth', auth);
app.use('/shows', shows);
app.use('/users', users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
