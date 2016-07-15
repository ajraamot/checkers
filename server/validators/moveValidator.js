/* eslint-disable consistent-return, no-param-reassign */

import joi from 'joi';
import logger from '../config/logging';

const schema = {
  origin: joi.object().required(),
  dest: joi.object().required(),
};

module.exports = (req, res, next) => {
  logger.log('info', 'validating move body');
  const result = joi.validate(req.body, schema);
  logger.log('info', 'Move body validation completed');
  logger.log(result);
  if (result.error) {
    res.status(400).send({ messages: result.error.details.map(d => d.message) });
  } else {
    res.locals = result.value;
    next();
  }
};
