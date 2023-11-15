const Avatar = require('../models/avatar');

const getOneByAvatar = async (req, res) => {
  try {
    const { avatar_id } = req.params;
    const result = await Avatar.getAvatarByAvatar(avatar_id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

const getAvatarByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await Avatar.getAvatarByUser(user_id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const data = req.body;
    const result = await Avatar.updateAvatar(data);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getOneByAvatar,
  getAvatarByUser,
  updateAvatar,
};
