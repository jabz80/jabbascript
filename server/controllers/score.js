const Score = require('../models/score');

const getAll = async (req, res) => {
  try {
    const result = await Score.getAll();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Score.getScoreByUser(id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'not found' });
  }
};

module.exports = { getAll, getOneById };
