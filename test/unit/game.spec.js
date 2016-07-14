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
      expect(g1.player1.name).to.equal('Bob');
      expect(g1.player2.name).to.equal('Anna');
      done();
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
    });
  });
});
