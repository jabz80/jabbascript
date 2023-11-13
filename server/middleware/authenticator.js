const Token = require('../models/token');

async function authenticator(req, res, next) {
  try {
    const userToken = req.headers['authorization'];
    console.log(userToken);

    if (userToken == 'null') {
      throw new Error('User not authenticated.');
    } else {
      const validToken = await Token.getOneByToken(userToken);

      req.user = validToken;
      
      next();
    }
    
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = authenticator;
