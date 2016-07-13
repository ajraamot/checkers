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
    const p1 = new Player({ name: 'Bob', playerNumber: 1 });
    const p2 = new Player({ name: 'Anna', playerNumber: 2 });
    const g1 = new Game(p1, p2);
    g1.initiate();
    expect(g1.pieces[0].row).to.equal(1);
    expect(g1.pieces[0].col).to.equal(2);
    expect(g1.pieces[11].row).to.equal(3);
    expect(g1.pieces[11].col).to.equal(8);
    expect(g1.pieces[4].color).to.equal('red');
    expect(g1.pieces[12].row).to.equal(6);
    expect(g1.pieces[12].col).to.equal(1);
    expect(g1.pieces[23].row).to.equal(8);
    expect(g1.pieces[23].col).to.equal(7);
    expect(g1.pieces.length).to.equal(24);
    expect(g1.pieces[20].color).to.equal('black');
  });
});
