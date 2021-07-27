const router = require('express').Router();
const Users = require('../models/admins');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'public/img')

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

router.get('/', async (req, res) => {
  if (req.session.user) {
    const { user } = req.session;
    const findUser = await Users.findOne({ _id: user._id });
    if(user.administrator == true) {
      res.redirect('/admin');
    }
    res.render('profile', { findUser });
  } else {
    res.redirect('/');
  }
});


router.put('/foto', upload.single('pictures'), async (req, res) => {


  const { user } = req.session;
  const findUser = await Users.findOne({ _id: user._id });


  findUser.image = await req.file?.filename;

  await findUser.save();

  res.json(req.file?.filename);
})


module.exports = router;
