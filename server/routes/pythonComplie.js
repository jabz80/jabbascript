const { Router } = require('express');
const pythonRoute = Router();
const pythonController = require('../controllers/python.js');

pythonRoute.post('/', pythonController.compile);

module.exports = pythonRoute;
