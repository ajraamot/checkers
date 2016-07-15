/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const Game = require('../../dst/models/game');
const Player = require('../../dst/models/player');

describe('Game', () => {
  describe('constructor', () => {
    it('should create game object', (done) => {
      const player1 = new Player({ name: 'Bob' });
      const player2 = new Player({ name: 'Anna' });
      const g1 = new Game(player1, player2);
      g1.validate(err => {
        expect(err).to.be.undefined;
        done();
      });
    });
    it('should not create game object, no name provided', () => {
      const g1 = new Game({ });
      expect(g1).to.be.Error; //
    });
  });
  describe('initiate pieces', () => {
    it('should initiate game object', () => {
      const p1 = new Player({ name: 'Bob', playerNumber: 1 });
      const p2 = new Player({ name: 'Anna', playerNumber: 2 });
      const g1 = new Game(p1, p2);
      g1.initiate();
      expect(g1.position.length).to.equal(64);
      expect(g1.position.find((a) => a.name === '12').val.color).to.equal('red');
      expect(g1.position.find((a) => a.name === '11').val).to.be.null;
      expect(g1.position.find((a) => a.name === '61').val.color).to.equal('black');
      expect(g1.position.find((a) => a.name === '88').val).to.be.null;
    });
  });
  describe('move a piece', () => {
    it('should move a piece', () => {
      const p1 = new Player({ name: 'Bob', playerNumber: 1 });
      const p2 = new Player({ name: 'Anna', playerNumber: 2 });
      const g1 = new Game(p1, p2);
      g1.initiate();
      g1.move({ r: 3, c: 2 }, { r: 4, c: 3 });
      expect(g1.position.find((a) => a.name === '32').val).to.be.null;
      expect(g1.position.find((a) => a.name === '43').val.color).to.equal('red');
      g1.move({ r: 6, c: 3 }, { r: 5, c: 2 });
      expect(g1.position.find((a) => a.name === '63').val).to.be.null;
      expect(g1.position.find((a) => a.name === '52').val.color).to.equal('black');
    });
    it('should not move a piece', () => {
      const p1 = new Player({ name: 'Bob', playerNumber: 1 });
      const p2 = new Player({ name: 'Anna', playerNumber: 2 });
      const g1 = new Game(p1, p2);
      g1.initiate();
      let z = g1.move({ r: 1, c: 1 }, { r: 2, c: 2 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid move: no piece at that position');
      z = g1.move({ r: 6, c: 3 }, { r: 7, c: 2 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid move: cannot move to that position, already occupied');
      expect(g1.position.find((a) => a.name === '63').val.color).to.equal('black');
      z = g1.move({ r: 2, c: 1 }, { r: 3, c: 0 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid move: move out of bounds');
      z = g1.move({ r: 1, c: 2 }, { r: 0, c: 1 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid move: move out of bounds');
      z = g1.move({ r: 3, c: 2 }, { r: 4, c: 4 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid move: can only move diagonally one space');
      expect(g1.position.find((a) => a.name === '32').val.color).to.equal('red');
    });
  });
  describe('jump a piece', () => {
    it('should jump a piece', () => {
      const p1 = new Player({ name: 'Bob', playerNumber: 1 });
      const p2 = new Player({ name: 'Anna', playerNumber: 2 });
      const g1 = new Game(p1, p2);
      g1.initiate();
      g1.move({ r: 3, c: 2 }, { r: 4, c: 3 });
      g1.move({ r: 6, c: 5 }, { r: 5, c: 4 });
      g1.jump({ r: 4, c: 3 }, { r: 6, c: 5 });
      expect(g1.position.find((a) => a.name === '43').val).to.be.null;
      expect(g1.position.find((a) => a.name === '54').val).to.be.null;
      expect(g1.position.find((a) => a.name === '65').val.color).to.equal('red');
      expect(g1.redPieces).to.equal(12);
      expect(g1.blackPieces).to.equal(11);
    });
    it('should not jump a piece', () => {
      const p1 = new Player({ name: 'Bob', playerNumber: 1 });
      const p2 = new Player({ name: 'Anna', playerNumber: 2 });
      const g1 = new Game(p1, p2);
      g1.initiate();
      let z = g1.jump({ r: 1, c: 1 }, { r: 2, c: 2 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid jump: no piece at that position');
      z = g1.jump({ r: 6, c: 3 }, { r: 7, c: 2 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid jump: cannot jump to that position, already occupied');
      expect(g1.position.find((a) => a.name === '63').val.color).to.equal('black');
      z = g1.jump({ r: 2, c: 1 }, { r: 3, c: 0 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid jump: jump out of bounds');
      z = g1.jump({ r: 1, c: 2 }, { r: 0, c: 1 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid jump: jump out of bounds');
      z = g1.jump({ r: 3, c: 2 }, { r: 4, c: 4 });
      expect(z).to.be.Error;
      expect(z.message).to.equal('invalid jump: can only jump diagonally two spaces');
      expect(g1.position.find((a) => a.name === '32').val.color).to.equal('red');
    });
  });
  describe('king a piece', () => {
    it('should king a piece', () => {
      const p1 = new Player({ name: 'Bob', playerNumber: 1 });
      const p2 = new Player({ name: 'Anna', playerNumber: 2 });
      const g1 = new Game(p1, p2);
      g1.initiate();
      g1.position[28] = { name: '43', val: null };
      g1.position[35] = { name: '54', val: null };
      g1.position[44] = { name: '65', val: null };
      g1.position[53] = { name: '76', val: null };
      g1.position[62] = { name: '87', val: null };
      g1.move({ r: 3, c: 2 }, { r: 4, c: 3 }); // red
      g1.turn = 'red';
      g1.move({ r: 4, c: 3 }, { r: 5, c: 4 }); // red
      g1.turn = 'red';
      g1.move({ r: 5, c: 4 }, { r: 6, c: 5 }); // red
      g1.turn = 'red';
      g1.move({ r: 6, c: 5 }, { r: 7, c: 6 }); // red
      g1.turn = 'red';
      g1.move({ r: 7, c: 6 }, { r: 8, c: 7 }); // red
      expect(g1.position.find((a) => a.name === '87').val.color).to.equal('red');
      expect(g1.position.find((a) => a.name === '87').val.kinged).to.equal(true);
    });
  });
});
