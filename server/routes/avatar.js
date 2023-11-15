const { Router } = require('express');

const {
  getOneByAvatar,
  getAvatarByUser,
  updateAvatar,
} = require('../controllers/avatar');

const avatarRouter = Router();

avatarRouter.get('/avatar/:avatar_id', getOneByAvatar);
avatarRouter.get('/user/:user_id', getAvatarByUser);
avatarRouter.patch('/', updateAvatar);

module.exports = Router;
