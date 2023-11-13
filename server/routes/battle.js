const { Router } = require('express');

const { getAll, getOneById } = require('../controllers/battle');

const battleRouter = Router();

battleRouter.get('/', getAll);
battleRouter.get('/:id', getOneById);

module.exports = battleRouter;
