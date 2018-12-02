import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import sessionParser from 'express-session';

import passport from 'passport';
import { LocalPasswordStrategy, serializeUser, deserializeUser } from './strategies/local_password';

import indexRouter from './routes/index';
import catalogRouter from './routes/catalog';
import authRouter from './routes/auth';

const app = express();
const config = require(`./config/${app.get('env')}`);

mongoose.connect(config.mongo.url, { useNewUrlParser: true });
mongoose.connection.on('error', () => console.error('MongoDB connection error:'));

passport.use(LocalPasswordStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionParser({ secret: config.app.secret, resave: false, saveUninitialized: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/catalog', catalogRouter);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
