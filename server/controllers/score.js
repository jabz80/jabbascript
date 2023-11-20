const Score = require('../models/score');

const getAll = async (req, res) => {
  try {
    const result = await Score.getAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Score.getScoreByUser(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }
};

const updateScore = async (req, res) => {
  try {
    const { id } = req.params; // Assuming userId is provided in the request parameters

    let newScore = req.body.newScore; // Assuming newScore is provided in the request body
    const scoreToUpdate = await Score.getScoreByUser(id);

    newScore ||= scoreToUpdate.newScore;

    // Call the updateScore function in the Score model
    const updatedScore = await Score.updateScore(id, newScore);

    res.status(200).json(updatedScore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getOneById, updateScore };
