const { Router } = require('express');

const { getAll, getOneById, updateScore } = require('../controllers/score');

const scoreRouter = Router();

scoreRouter.get('/', getAll);

scoreRouter.get('/:id', getOneById);
scoreRouter.patch('/:id', updateScore);

module.exports = scoreRouter;
