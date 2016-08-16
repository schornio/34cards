'use strict';

const { Router } = require('express');

module.exports = (dependencies) => {

  const getCards = (request, response) => {
    response.json([
      { _id: '1', left: 'Hard', right: 'Soft' },
      { _id: '2', left: 'City', right: 'Countryside' },
      { _id: '3', left: 'Tea', right: 'Coffee' },
    ]);
  };

  let router = new Router();

  router.get('/', getCards);

  return router;
};
