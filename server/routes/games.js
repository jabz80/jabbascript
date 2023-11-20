const { Router } = require('express');

const {
  getAll,
  getOneById,
  updateGame,
  createGame,
} = require('../controllers/games');


const gamesRouter = Router();

gamesRouter.get('/', getAll);
gamesRouter.get('/:id', getOneById);
gamesRouter.post('/', createGame);
gamesRouter.patch('/:id', updateGame);

module.exports = gamesRouter;
