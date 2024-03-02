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

app.use((req, res, next) => {
    const allowedOrigins = [
        'http://localhost:5173'
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://127.0.0.1:5173',
            // Tambahkan origin lain di sini jika diperlukan
        ];

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));


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