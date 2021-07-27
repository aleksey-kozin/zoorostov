
module.exports = function (app) {
  const express = require('express');
  const morgan = require('morgan');
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  const { cookiesCleaner } = require('./cookie');

  const path = require('path');
  const hbs = require('hbs');

  const FileStore = require('session-file-store')(session);

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '..', 'views'));
  hbs.registerPartials(path.join(__dirname, '..', 'views', 'partials')); // !!!!!PARTIALS

  app.use(morgan('dev'));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieParser());

  app.use(
    session({
      store: new FileStore(),
      key: 'user_sid',
      secret: 'beavers',
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 1000 * 60 * 60 * 24,
        httpOnly: false,
      },
    })
  );

  app.use((req, res, next) => {

    if (req.session.user) {
      res.locals.user = req.session.user

    }
    next();
  });

  app.use(cookiesCleaner);
};


