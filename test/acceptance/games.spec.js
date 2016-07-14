/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');

describe('game', () => {
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      done();
    });
  });
  describe('create game', () => {
    it('should find a player', (done) => {
      //
      request(app)
      .post('/games/')
      .send({ p1: '01234567890123456789abcd', p2: '01234567890123456789abce' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        console.log(rsp.body);
        expect(rsp.body.game).to.be.ok;
        expect(rsp.body.game.player1.name).to.equal('Bob');
        expect(rsp.body.game.player2.name).to.equal('Anna');
        expect(rsp.body.game.turn).to.equal(1);
        expect(rsp.body.game.gameover).to.equal(false);
        done();
      });
    });
  });
});
