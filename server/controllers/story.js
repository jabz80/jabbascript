const Story = require('../models/story');

const getAll = async (req, res) => {
  try {
    const result = await Story.getAll();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Story.getOneById(id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

module.exports = { getAll, getOneById };
