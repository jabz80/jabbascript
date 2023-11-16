const Avatar = require('../models/avatar');

const getAll = async (req, res) => {
  try {
    const result = await Avatar.getAll();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll }