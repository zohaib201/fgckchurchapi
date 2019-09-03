var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./database/database');

var indexRouter = require('./routes/index');

var imageRouter = require('./routes/image');
var userRouter = require('./routes/user');
var genreRouter = require('./routes/genre');
var cellGroupRouter = require('./routes/cell_group');
var MemberFromAppRouter = require('./routes/member_from_app');
var MemberRouter = require('./routes/member');
var PrayerRouter = require('./routes/prayer');
var VideoRouter = require('./routes/video');
var AudioRouter = require('./routes/audio');
var DevotionalRouter = require('./routes/devotional');
var EventRouter = require('./routes/event');
var NotificationRouter = require('./routes/notification');
var questionRouter = require('./routes/question');
var financialRouter = require('./routes/financial');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/images'));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
});

app.use('/', indexRouter);


app.use('/user', userRouter);
app.use('/image', imageRouter);
app.use('/cell_group', cellGroupRouter);
app.use('/member_from_app', MemberFromAppRouter);
app.use('/member', MemberRouter);
app.use('/prayer', PrayerRouter);
app.use('/video', VideoRouter);
app.use('/audio', AudioRouter);
app.use('/devotional', DevotionalRouter);
app.use('/event', EventRouter);
app.use('/notification', NotificationRouter);
app.use('/question', questionRouter);
app.use('/financial', financialRouter);

app.use('/genre', genreRouter);

module.exports = app;