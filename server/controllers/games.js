/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */

import express from 'express';
import Player from '../models/player';
import Game from '../models/game';
import gameValidator from '../validators/gameBody';
const router = module.exports = express.Router();


router.post('/', gameValidator, (req, res) => {
  // find player 1
  Player.findById(res.locals.p1, (err, p1) => {
    Player.findById(res.locals.p2, (err2, p2) => {
      const g1 = new Game(p1, p2);
      g1.initiate();
      res.send({ game: g1 });
    });
  });
  // find player 2
  // create new game
  // start game
  // send back game
  // Player.create({ name: res.locals.name }, (err, player) => {
  // });
});
