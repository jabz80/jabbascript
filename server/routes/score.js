const { Router } = require('express');

const { getAll, getOneById } = require('../controllers/score');

const scoreRouter = Router();

scoreRouter.get('/', getAll);
scoreRouter.get('/:id', getOneById);

module.exports = scoreRouter;
