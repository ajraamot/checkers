/* eslint-disable max-len, func-names, consistent-return*/
import Piece from './piece';

function Game(player1, player2) {
  if (!player1 || !player2) { return new Error('missing arguments'); }
  this.player1 = player1;
  this.player2 = player2;
  this.turn = 1;
  this.gameover = false;
  // this.pieces = [];
  this.position = [];
}

Game.prototype.initiate = function () { // instance method
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
  console.log(this.position);
};

Game.prototype.move = function (origin, dest) {
  if (this.position.find((a) => a.name === `${origin.r}${origin.c}`).val === null) {
    return new Error('invalid move: no piece at that position');
  }
  const piece = this.position.find((a) => a.name === `${origin.r}${origin.c}`);
  console.log(piece);

// 1st: find if there is a piece in the origin
// is there a piece at dest
// is the move is valid : (within board)
// is the move is valid : (one pos over and across)
// if not kinged cannot move backward

// change the position of dest to the have the obj
// null the origin position


};

module.exports = Game;
