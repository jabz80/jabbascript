const { Router } = require('express');

const { getAll } = require('../controllers/avatar');

const avatarRouter = Router();

avatarRouter.get('/', getAll);

module.exports = avatarRouter;