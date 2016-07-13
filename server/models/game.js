/* eslint-disable max-len*/
import Piece from './piece';
// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;
//
// const schema = new Schema({
//   player1: { type: mongoose.Schema.ObjectId, ref: 'Player', required: true },
//   player2: { type: mongoose.Schema.ObjectId, ref: 'Player', required: true },
//   turn: { type: Number, default: 1 },
//   gameover: { type: Boolean, default: false },
//   pieces: [],
// });
//
// schema.methods.initiate = function () { // instance method
//   for (let x = 0; x < 12; x++) {
//     const p = new Piece({ row: Math.floor(x / 4) + 1, col: (Math.floor(x / 4) === 1 ? (2 * (x % 4) + 1) : (2 * (x % 4) + 2)), color: 'red' });
//     this.pieces.push(p);
//   }
//   for (let x = 0; x < 12; x++) {
//     const p = new Piece({ row: 5 + Math.floor(x / 4) + 1, col: (Math.floor(x / 4) === 1 ? (2 * (x % 4) + 2) : (2 * (x % 4) + 1)), color: 'black' });
//     this.pieces.push(p);
//   }
// };
//
// module.exports = mongoose.model('Game', schema);

function Game(player1, player2) {
  if (!player1 || !player2) { return new Error('missing arguments'); }
  this.player1 = player1;
  this.player2 = player2;
  this.turn = 1;
  this.gameover = false;
  this.pieces = [];
}

Game.prototype.initiate = function () { // instance method
  for (let x = 0; x < 12; x++) {
    const p = new Piece({ row: Math.floor(x / 4) + 1, col: (Math.floor(x / 4) === 1 ? (2 * (x % 4) + 1) : (2 * (x % 4) + 2)), color: 'red' });
    this.pieces.push(p);
  }
  for (let x = 0; x < 12; x++) {
    const p = new Piece({ row: 5 + Math.floor(x / 4) + 1, col: (Math.floor(x / 4) === 1 ? (2 * (x % 4) + 2) : (2 * (x % 4) + 1)), color: 'black' });
    this.pieces.push(p);
  }
};

module.exports = Game;
