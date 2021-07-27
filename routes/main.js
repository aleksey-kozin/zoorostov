require('../db/mongoose');
const Animal = require('../models/animals.model');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const animals = await Animal.find();

  const firstAnimals = animals.slice(0, 6);

  const arrAnimals = [];
  firstAnimals.forEach((el) => {
    arrAnimals.push(
      `
      <div class="card card-inner" style="width: 25rem;">
      <img src=${el.img[0]} class="card-img-top" alt="phot">
      <div class="card-body">
        <h1 class="card-title">${el.name}</h1>
        <p class="card-text">${el.description.slice(0, 60)}...</p>
        <a href="/info/${
          el._id
        }" class="btn btn-primary">Подробная информация</a>
      </div>
      </div>
      `
    );
  });

  res.render('main', {
    content0: arrAnimals[0],
    content1: arrAnimals[1],
    content2: arrAnimals[2],
    content3: arrAnimals[3],
    content4: arrAnimals[4],
    content5: arrAnimals[5],
  });
});

router.get('/add', async (req, res) => {
  const animal = await Animal.find();
  res.json(animal);
});

router.post('/search', async (req, res) => {
  const { search } = req.body;
  const animal = await Animal.findOne({ name: search });
  res.json(animal);
});

module.exports = router;
