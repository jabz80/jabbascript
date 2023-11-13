const { Router } = require('express');

const { getAll, getOneById } = require('../controllers/story');

const storyRouter = Router();

storyRouter.get('/', getAll);
storyRouter.get('/:id', getOneById);

module.exports = storyRouter;
