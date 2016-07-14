/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */

import express from 'express';
import Player from '../models/player';
import Game from '../models/game';
import gameValidator from '../validators/gameBody';
import moveValidator from '../validators/moveValidator';
import paramsValidator from '../validators/paramsValidator';
const router = module.exports = express.Router();


router.post('/', gameValidator, (req, res) => {
  Player.findById(res.locals.player1, (err, player1) => {
    if (!player1) res.status(400).send(new Error('Player one not found'));
    else {
      Player.findById(res.locals.player2, (err2, player2) => {
        if (!player2) res.status(400).send(new Error('Player Two not found'));
        else {
          Game.create({ player1, player2 }, (err3, game) => {
            Game.findById(game._id)
            .populate('player1')
            .populate('player2')
            .exec((err4, game2) => {
              game2.initiate();
              game2.save(() => {
                res.send({ game: game2 });
              });
            });
          });
        }
      });
    }
  });
});

router.put('/:id/move', paramsValidator, moveValidator, (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    if (!game) res.status(400).send(new Error('Game not found'));
    else {
      game.initiate();
      game.move(res.locals.origin, res.locals.dest);
      // console.log(game);
      res.send({ game });
    }
  });
});


// update
// router.put('/:id', paramsValidator, bodyValidator, (req, res) => {
//   Bookmark.findByIdAndUpdate(req.params.id, res.locals, { new: true }, (err, bookmark) => {
//     res.send({ bookmark });
//   });
// });

// router.put('/:id/move', gameValidator, (req, res) => {
// });
