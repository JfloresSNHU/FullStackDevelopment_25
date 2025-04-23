require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const hbs = require('hbs');

const app = express();

// Database and Passport Config
require('./app_api/models/db');
require('./app_api/models/trips');
require('./app_api/models/user');
require('./app_api/config/passport');

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // 
app.use(passport.initialize());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routers
const serverViewsRouter = require('./app_server/routes/index'); // HBS views
const usersRouter = require('./app_server/routes/users');
const apiRouter = require('./app_api/routes/index');

// Route handling
app.use('/', serverViewsRouter); // Customer-facing views
app.use('/users', usersRouter);  // Optional user routes
app.use('/api', apiRouter);      // API endpoints

// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

