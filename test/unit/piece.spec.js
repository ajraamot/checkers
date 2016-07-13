/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const Piece = require('../../dst/models/piece');

describe('Piece', () => {
  describe('constructor', () => {
    it('should create piece object', () => {
      const piece = new Piece({ row: 1, col: 1, color: 'red' });
      expect(piece.row).to.equal(1);
      expect(piece.col).to.equal(1);
      expect(piece.color).to.equal('red');
// let d='d'
// console.log(Number(d)+3);
// console.log(Number(d)-2);
    });
    it('should not create piece object, no arguments provided', () => {
      const piece = new Piece({ });
      expect(piece).to.be.Error; //
    });
  });
});
