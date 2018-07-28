var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var getCityRouter = require('./routes/city/getCityRouter');
var postCityRouter = require('./routes/city/postCityRouter');
var deleteCityRouter = require('./routes/city/deleteCityRouter');
var postUserRouter = require('./routes/user/postUserRouter');
var getUserRouter = require('./routes/user/getUserRouter');
var putUserRouter = require('./routes/user/putUserRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/city', getCityRouter);
app.use('/api/city', postCityRouter);
app.use('/api/city', deleteCityRouter);
app.use('/api/user', postUserRouter);
app.use('/api/user', getUserRouter);
app.use('/api/user', putUserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

module.exports = app;
