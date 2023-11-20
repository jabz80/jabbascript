const Games = require('../models/games');
const User = require('../models/user');

const getAll = async (req, res) => {
  try {
    const result = await Games.getAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

const getOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Games.getGamesById(id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'not found' });
  }
};

const createGame = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const editedToken = token.split(' ')[1];

    const user = await User.getOneByToken(editedToken);

    const newGame = req.body;
    const result = await Games.createGame(user.user_id, newGame);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

const updateGame = async (req, res) => {
  try {
    const { id } = req.params;

    const gameStatus = req.body.game_status;

    const updatedGameStatus = await Games.updateGame(id, gameStatus);

    res.status(200).json(updatedGameStatus);
  } catch (err) {
    res.status(500).json({ error: err.messsage });
  }
};

module.exports = { getAll, getOneById, createGame, updateGame };
