var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// MySQL setting
/**
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'iamas',
  database: process.env.DB_NAME || 'iamas_workshop'
});
**/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('全然動かないよ！！');
});

app.use('/', index);
app.use('/users', users);

/**
app.get('/colors', function (req, res) {
  console.log("here");
  connection.query('select * from colors', function (err, rows) {
    console.log(rows);
    res.render('colors', { title: 'Express Users', colors: rows });
  });
});
**/

/**
app.get('/delete', function (req, res) {
  console.log("here");
  connection.query('truncate table colors', function (err, rows) {
    console.log(rows);
    res.send('全部消えました！');
  });
});
**/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


module.exports = app;
