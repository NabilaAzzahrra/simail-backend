var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var refreshtokensRouter = require('./routes/refreshtokens');
var criteriasRouter = require('./routes/criterias');
var employeesRouter = require('./routes/employees');
var mailsRouter = require('./routes/mails');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/refreshtokens', refreshtokensRouter);
app.use('/criterias', criteriasRouter);
app.use('/employees', employeesRouter);
app.use('/mails', mailsRouter);

module.exports = app;