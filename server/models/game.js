/* eslint-disable max-len, func-names, consistent-return, no-underscore-dangle*/
import Piece from './piece';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  player1: { type: mongoose.Schema.ObjectId, ref: 'Player', required: true },
  player2: { type: mongoose.Schema.ObjectId, ref: 'Player', required: true },
  turn: { type: String, default: 'red' },
  gameover: { type: Boolean, default: false },
  position: [],
});

schema.methods.initiate = function () { // instance method
  for (let r = 1; r <= 8; r++) {
    for (let c = 1; c <= 8; c++) {
      let a = {};
      if (r === 1 || r === 3) {
        if (this.position.length % 2 === 0) {
          a = { name: `${r}${c}`, val: null };
        } else {
          const p = new Piece({ color: 'red' });
          a = { name: `${r}${c}`, val: p };
        }
      } else if (r === 2) {
        if (this.position.length % 2 === 0) {
          const p = new Piece({ color: 'red' });
          a = { name: `${r}${c}`, val: p };
        } else {
          a = { name: `${r}${c}`, val: null };
        }
      }
      if (r === 4 || r === 5) {
        a = { name: `${r}${c}`, val: null };
      }
      if (r === 6 || r === 8) {
        if (this.position.length % 2 === 1) {
          a = { name: `${r}${c}`, val: null };
        } else {
          const p = new Piece({ color: 'black' });
          a = { name: `${r}${c}`, val: p };
        }
      } else if (r === 7) {
        if (this.position.length % 2 === 1) {
          const p = new Piece({ color: 'black' });
          a = { name: `${r}${c}`, val: p };
        } else {
          a = { name: `${r}${c}`, val: null };
        }
      }
      this.position.push(a);
    }
  }
  // schema.findByIdAndUpdate({ _id: this._id }, () => {
    //
  // });
};

schema.methods.move = function (origin, dest) {
  if (dest.r <= 0 || dest.r > 8) return new Error('invalid move: move out of bounds');
  if (dest.c <= 0 || dest.c > 8) return new Error('invalid move: move out of bounds');
  if (this.position.find((a) => a.name === `${origin.r}${origin.c}`).val === null) {
    return new Error('invalid move: no piece at that position');
  }
  if (this.position.find((a) => a.name === `${dest.r}${dest.c}`).val !== null) {
    return new Error('invalid move: cannot move to that position, already occupied');
  }
  if (Math.abs(origin.r - dest.r) !== 1 || Math.abs(origin.c - dest.c) !== 1) {
    return new Error('invalid move: can only move diagonally one space');
  }
  const piece = this.position.find((a) => a.name === `${origin.r}${origin.c}`).val;
  if (piece.color !== this.turn) {
    return new Error(`invalid move: It is the ${this.turn}'s turn`);
  }
  if (piece.color === 'red' && piece.kinged === false && (origin.r - dest.r) === 1) {
    return new Error('invalid move: can only move forward until kinged');
  }
  if (piece.color === 'black' && piece.kinged === false && (origin.r - dest.r) === -1) {
    return new Error('invalid move: can only move forward until kinged');
  }
  this.position.find((a) => a.name === `${dest.r}${dest.c}`).val = piece;
  this.position.find((a) => a.name === `${origin.r}${origin.c}`).val = null;
  this.turn = this.turn === 'red' ? 'black' : 'red';
};

module.exports = mongoose.model('Game', schema);
