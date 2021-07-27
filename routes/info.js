const router = require('express').Router();
const Animal = require('../models/animals.model');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const findAnimal = await Animal.findOne({ _id: id })
  res.render('info', { findAnimal })

});

router.post('/', (req, res) => {});

module.exports = router;
