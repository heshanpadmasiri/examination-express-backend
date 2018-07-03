const debug = require('debug');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');
const admin = require('firebase-admin');
const serviceAccount = require('./examination-system-cd948-firebase-adminsdk-n14fr-0934ade5a9.json');
const cors = require('cors');



// initialize firebase admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://examination-system-cd948.firebaseio.com"
});

const routes = require('./routes/index');
const users = require('./routes/users');
const modules = require('./routes/modules');

const app = express();

app.use(cors({origin:true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// setup routes
app.use('/', routes);
app.use('/users', users);
app.use('/modules',modules);

// setup error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log('Server ready on port:' + server.address().port);
});
