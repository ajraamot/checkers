/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */

import express from 'express';
// import Game from '../models/game';
import Player from '../models/player';
import bodyValidator from '../validators/playerBody';
const router = module.exports = express.Router();

// create
router.post('/', bodyValidator, (req, res) => {
  Player.create({ name: res.locals.name }, (err, player) => {
    res.send({ player });
  });
});
