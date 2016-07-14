/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');

describe('games', () => {
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      cp.execFile(`${__dirname}/../scripts/populategame.sh`, { cwd: `${__dirname}/../scripts` }, () => {
        done();
      });
    });
  });
  describe('post /games', () => {
    it('should create game', (done) => {
      request(app)
      .post('/games')
      .send({ player1: '01234567890123456789abcd', player2: '01234567890123456789abce' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.game).to.be.ok;
        expect(rsp.body.game.player1.name).to.equal('Bob');
        expect(rsp.body.game.player2.name).to.equal('Anna');
        expect(rsp.body.game.turn).to.equal('red');
        expect(rsp.body.game.gameover).to.equal(false);
        done();
      });
    });
    it('should not create game', (done) => {
      request(app)
      .post('/games')
      .send({ player2: '01234567890123456789abce' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.game).to.be.undefind;
        done();
      });
    });
    it('should not create game, player does not exist', (done) => {
      request(app)
      .post('/games')
      .send({ player1: '01234567890123456789abcd', player2: '01234567890123456789ab22' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.game).to.be.undefind;
        done();
      });
    });
  });
  describe('put /games', () => {
    it('should move a piece', (done) => {
      request(app)
      .put('/games/5787f3390ffb884065a7133c/move')
      .send({ origin: { r: 3, c: 2 }, dest: { r: 4, c: 3 } })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.game).to.be.ok;
        expect(rsp.body.game.turn).to.equal('black');
        expect(rsp.body.game.gameover).to.equal(false);
        done();
      });
    });
    it('should not move a piece', (done) => {
      request(app)
      .put('/games/5787f3390ffb884065a7133c/move')
      .send({ origin: { r: 1, c: 2 }, dest: { r: 2, c: 3 } })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.game).to.be.ok;
        expect(rsp.body.game.turn).to.equal('red');
        expect(rsp.body.game.gameover).to.equal(false);
        expect(rsp.body.game.position[1].val.color).to.equal('red');
        done();
      });
    });
  });
});
