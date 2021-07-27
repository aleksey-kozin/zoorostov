const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { type: String, default: 'DefaultAvatar.png' },
  administrator: { type: Boolean, default: false },
});

module.exports = model('Users', usersSchema);
