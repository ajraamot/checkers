/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const Player = require('../../dst/models/player');


describe('Player', () => {
  describe('constructor', () => {
    it('should create player object', (done) => {
      const p1 = new Player({ name: 'Bob' });
      expect(p1.name).to.equal('Bob');
      expect(p1._id).to.be.ok;
      done();
    });
    it('should not create player object, no name provided', (done) => {
      const p1 = new Player({ });
      p1.validate(err => {
        expect(err).to.be.ok; //
        done();
      });
    });
  });
});
