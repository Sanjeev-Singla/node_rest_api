const express = require('express');
const bodyParser = require('body-parser');
const checkAuthMiddleware = require('./middleware/check-auth');

const app = express();

const postsRuote = require('./routes/posts');
const usersRuote = require('./routes/users');

app.use(bodyParser.json());

app.use('/posts', checkAuthMiddleware.checkAuth, postsRuote);
app.use('/users', usersRuote);

module.exports = app;