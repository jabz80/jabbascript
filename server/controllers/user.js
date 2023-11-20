const User = require('../models/user');
const bcrypt = require('bcrypt');
const Token = require('../models/token');

const register = async (req, res) => {
  try {
    const data = req.body;

    //Generate salt with specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    //Hash the password
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;

    const result = await User.create(data);
    const token = await Token.create(result.user_id);

    res
      .status(201)
      .json({ authenticated: true, token: token.token, data: result });
    // res.status(201).send(result)
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    // Storing the data from req.body
    const { username, password } = req.body;
    // Check if username exists
    const user = await User.checkUsername(username);
    // Compare passwords using bcrypt
    const legit = await bcrypt.compare(password, user.password);

    // Checking if the password is correct
    if (!legit) {
      throw new Error('Username and password does not match');
    } else {
      try {
        const prevToken = await Token.getByUser(user.user_id);
        const result = await prevToken.destroyToken();
      } catch (err) {
      } finally {
        const token = await Token.create(user.user_id);
        // Sending a response to the client
        res.status(200).json({ token: token.token });
      }
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logOut = async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const fullToken = await Token.getOneByToken(token);
    const result = await fullToken.destroyToken();
    res.status(204).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const findByToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const editedToken = token.split(' ')[1];
    const user = await User.getOneByToken(editedToken);
    res.status(201).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const editedToken = token.split(' ')[1];
    let userPassword = req.body.password;

    const userToUpdate = await User.getOneByToken(editedToken);
    req.body.username ||= userToUpdate.username;
    userPassword ||= userToUpdate.password;
    req.body.email ||= userToUpdate.email;
    req.body.avatar_id ||= userToUpdate.avatar_id;

    if (userPassword) {
      const salt = await bcrypt.genSalt(
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      )

      const hashedPassword = await bcrypt.hash(userPassword, salt);

      req.body.password = hashedPassword;
    }

    const updatedUser = await User.updateUser(
      req.body,
      editedToken,
      true,
      req.body.avatar_id
    )

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { logIn, register, logOut, findByToken, updateUser };
