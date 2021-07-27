const router = require('express').Router();
const { week, day } = require('../models/price');

router.get('/', async (req, res) => {
  const priceWeek = await week.find();
  const priceDay = await day.find();
  // if(req.session.user) {
  //   const arr = priceWeek[priceWeek.length - 1];
  //   const arr2 = priceDay[priceDay.length - 1];

  //   res.render('price', {
  //     price_ch_w: parseFloat(arr.priceChild) * 0.9,
  //     price_ad_w: parseFloat(arr.priceAdult) * 0.9,
  //     price_ch_d: parseFloat(arr2.priceChild) * 0.9,
  //     price_ad_d: parseFloat(arr2.priceAdult) * 0.9,
  //   });
  // }
  const arr = priceWeek[priceWeek.length - 1];
  const arr2 = priceDay[priceDay.length - 1];
  // console.log(arr);
  res.render('price', {
    price_ch_w: arr.priceChild,
    price_ad_w: arr.priceAdult,
    price_ch_d: arr2.priceChild,
    price_ad_d: arr2.priceAdult,

  });
});

router.post('/add', async (req, res) => {
  console.log(req.body);
  const { select_ch, priceChild, priceAdult } = req.body;
  console.log(typeof select_ch);

  if (select_ch) {
    // Будни
    const price = await day.create({
      priceChild,
      priceAdult,
    });
    res.json(price);
  } else {
    // Праздники
    const price = await week.create({
      priceChild,
      priceAdult,
    });
    res.json(price);
  }
});

module.exports = router;
