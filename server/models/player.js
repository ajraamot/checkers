/* eslint-disable max-len*/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  playerNumber: { type: Number, min: 1, max: 2 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  pieces: [],
});


module.exports = mongoose.model('Player', schema);
