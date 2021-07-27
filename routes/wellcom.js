const express = require('express');
const Users = require('../models/admins');
const bcrypt = require('bcrypt');
const { sessionChecker } = require('../middleware/cookie');

const saltRounds = 10;
const router = express.Router();

router.get('/', sessionChecker, (req, res) => {
  res.render('mainWell');
});

router.get('/regform', (req, res) => {
  res.render('regForm', { layout: false });
});

router.get('/logform', (req, res) => {
  res.render('logForm', { layout: false });
});

router.post('/log', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user.administrator) {


    if (email && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;

      res.redirect('/admin');
    } else {
      res.redirect('/');
    }
  } else {
    if (email && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.redirect('/main');
    } else {
      res.redirect('/');
    }
  }
});

router.post('/reg', async (req, res, next) => {
  try {
    const { name, email, password, check } = req.body;
    const admin = await Users.create({
      name,
      email,
      password: await bcrypt.hash(password, saltRounds),
    });
    req.session.user = admin;
    res.redirect('/main');
  } catch (error) {
    return res.redirect('/');
  }
});

router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
