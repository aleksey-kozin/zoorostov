const router = require('express').Router();
const Animal = require('../models/animals.model')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage
})

router.post('/', upload.single('pictures'), async (req, res) => {

  const { name, description } = req.body;

  const image = req.file?.filename

  const newAnimal = new Animal({
    name: name,
    description: description,
    img: [image],
  })

  await newAnimal.save();

  res.json(image)

})

module.exports = router;
