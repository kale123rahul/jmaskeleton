import * as express from 'express';
import * as fs from 'fs';
import * as session from 'express-session';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as assert from 'assert';

import * as Promise from 'bluebird';
import * as logger from 'winston';

import * as mongoose from 'mongoose';


import {Strategy as LocalStrategy} from 'passport-local';
import {HttpError} from './utils/http-error';
var MongoStore = require('connect-mongodb-session')(session);

import {Server} from 'http';
import {Request, Response} from 'express';

import {initPassport} from './utils/init-passport';
import {initMongoose} from './utils/init-mongoose';
import * as userService from './services/user-service';
import {apiRouter} from './routes/apirouter'

// ENV variables used
var mongoHost = process.env["MONGO_HOST"];
var mongoPort = process.env["MONGO_PORT"]
var mongoDatabase = process.env["MONGO_DB"];
var appPort = process.env["APP_PORT"];
var appHost = process.env["APP_HOST"];


var mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//session
var sessionStore = new MongoStore({
  uri: mongoUri, 
  collection:'_sessions_' 
})
sessionStore.on('error', error=> { assert.ifError(error); assert.ok(false); });//catch errors
app.use(session({
  secret: 'this is a secret frase',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
  },
  store: sessionStore 
}));
app.use(passport.initialize());
app.use(passport.session());

initMongoose(mongoUri);
initPassport();
app.use("/api", apiRouter); 

app.get("/login",(req,res)=>{res.render('login')})
app.post("/login",passport.authenticate('local'), (req,res)=>res.json(req.user));
app.get('/logout', function(req, res) { req.logout(); res.sendStatus(200) });

app.use("/", express.static(path.join(__dirname, '../client/dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new HttpError('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use( (err: HttpError, req: Request, res: Response, next: Function) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use( (err: HttpError, req: Request, res: Response, next: Function) => {
  res.status(err.status || 500);
  res.json({
      message: err.message,
    });
});



var server : Server;
server = app.listen(appPort, appHost);
logger.info('Application is started and listening on port %s',appPort);
