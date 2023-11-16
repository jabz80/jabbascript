const db = require('../database/connect');

class User {
  constructor({ user_id, username, password, email, avatar_id }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.avatar_id = avatar_id
  }

  static async checkUsername(username) {
    const response = await db.query(
      'SELECT * FROM users WHERE username = $1;',
      [username]
    );

    if (response.rows.length != 1) {
      throw new Error('Unable to locate username!');
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    try {
      const { username, password, email } = data;

      let response = await db.query(
        'INSERT INTO users (username, password, email, avatar_id) VALUES ($1, $2, $3, $4) RETURNING user_id;',
        [username, password, email, 1] // setting avatar_id to 1 default
      );

      if (response.rows.length === 0) {
        throw new Error('Failed to create username');
      }
      return response.rows[0];
    } catch (err) {
      if (
        err.message ===
        'duplicate key value violates unique constraint "user_username_key"'
      ) {
        throw new Error('Username already exists');
      } else {
        throw new Error('Failed to create username');
      }
    }
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM users WHERE user_id = $1', [
      id,
    ]);

    if (response.rows.length != 1) {
      throw new Error('Unable to locate user');
    }
    return new User(response.rows[0]);
  }

  static async getOneByToken(token) {
    const responseToken = await db.query(
      'SELECT user_id FROM token WHERE token = $1',
      [token]
    );
    if (responseToken.rows.length != 1) {
      throw new Error('Unable to locate user');
    }
    const user = await User.getOneById(responseToken.rows[0].user_id);
    return user;
  }

  static async updateUser(data, token) {
    const user = await User.getOneByToken(token);
    const { username, password, email } = data;
    const response = await db.query(
      'UPDATE users SET username = $1, password = $2, email = $3 WHERE user_id = $4 RETURNING *',
      [username, password, email, user.user_id]
    );

    return new User(response.rows[0]);
  }

  static async updateUserAvatar(avatar_id, token) {
    const user = await User.getOneByToken(token);
    const response = await db.query(
      'UPDATE users SET avatar_id = $1 WHERE user_id = $2 RETURNING *',
      [avatar_id, user.user_id]
    );

    return new User(response.rows[0]);
  }

}

module.exports = User;
