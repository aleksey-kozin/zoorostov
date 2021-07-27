const mongoose = require('mongoose');

mongoose.pluralize(null);

const animalSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {type:String, required: true},

  img: [{ type: String }],
  
});

const Animal = mongoose.model('animal', animalSchema);

module.exports = Animal;
