const { Router } = require('express');

const authenticator = require('../middleware/authenticator');
const userController = require('../controllers/user');

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.logIn);
userRouter.delete('/logout', userController.logOut);
userRouter.get('/', authenticator, (req, res) => {
  res.sendStatus(200);
});
userRouter.get('/token', userController.findByToken);
userRouter.patch('/update', userController.updateUser);

module.exports = userRouter;
