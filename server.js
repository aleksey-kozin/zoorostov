const express = require('express');
const { connect } = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const useMiddleware = require('./middleware/index');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');

useMiddleware(app);

const profileRouter = require('./routes/profile');
const infoRouter = require('./routes/info');
const mainRouter = require(path.join(__dirname, 'routes', 'main.js'));
const loginRouter = require(path.join(__dirname, 'routes', 'admin.js'));
const wellcomRouter = require('./routes/wellcom');
const priceRouter = require('./routes/price');
const addAnimalRouter = require('./routes/animalAdd');

app.use('/profile', profileRouter);
app.use('/info', infoRouter);
app.use('/main', mainRouter);
app.use('/admin', loginRouter);
app.use('/', wellcomRouter);
app.use('/price', priceRouter);
app.use('/addAnimal', addAnimalRouter)
  ;
app.listen(port, () => {
  console.log(`Server run on port: ${port}`);

  connect('mongodb+srv://Admin:Beavers228@zoo.0mnlx.mongodb.net/Zoo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Base connect`);
});

module.exports = app;
