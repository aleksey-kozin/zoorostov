const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const priceWeekSchema = new Schema({
  priceChild: Number,
  priceAdult: Number,
  discount: { type: Number, default: 10 },
});

const priceDaySchema = new Schema({
  priceChild: Number,
  priceAdult: Number,
  discount: { type: Number, default: 10 },
});

module.exports = {
  week: model('PricesWeek', priceWeekSchema),
  day: model('PricesDay', priceDaySchema),
};
