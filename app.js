const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const refreshtokensRouter = require('./routes/refreshtokens');
const criteriasRouter = require('./routes/criterias');
const employeesRouter = require('./routes/employees');
const mailsRouter = require('./routes/mails');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());

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
app.use('/auth', authRouter);

module.exports = app;