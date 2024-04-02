var express = require('express');
var logger = require('morgan');
const cors = require('cors');


var namesRouter = require('./routes/names.router');
var slogansRouter = require('./routes/slogans.router');
var addsRouter = require('./routes/adds.router');
var authRouter =  require('./routes/auth.router');
var usersRouter = require('./routes/users.router')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use("/names", namesRouter);
app.use("/slogans", slogansRouter);
app.use("/adds", addsRouter);

app.get('/', (req, res) => {
	res.send('Hello world!');
});


module.exports = app;
