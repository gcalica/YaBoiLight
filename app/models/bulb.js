const mongoose = require('mongoose');

const BulbSchema = new mongoose.Schema({
  LOCATION: String,
  ID: String,
  MODEL: String,
  FW_VER: Number,
  SUPPORT: [String],
  POWER: String,
  BRIGHT: Number,
  COLOR_MODE: String,
  CT: Number,
  RGB: Number,
  HUE: Number,
  SAT: Number,
  NAME: String,
});

module.exports = mongoose.model('Bulb', BulbSchema);
