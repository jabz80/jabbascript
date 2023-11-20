const db = require('../database/connect');

class User {
  constructor({ user_id, username, password, email, avatar_id }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.avatar_id = avatar_id;
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
      const userId = response.rows[0].user_id;

      const userData = await db.query(
        'SELECT users.user_id, users.username, users.email, avatar.img_url, avatar.gender, avatar.skin_colour ' +
        'FROM users ' +
        'JOIN avatar ON users.avatar_id = avatar.avatar_id ' +
        'WHERE users.user_id = $1;',
        [userId]
      );

      if (userData.rows.length === 0) {
        throw new Error('Failed to retrieve user data');
      }

      return userData.rows[0];
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
      throw new Error('Unable to locate user token');
    }
    const user = await User.getOneById(responseToken.rows[0].user_id);

    const response = await db.query(
      'SELECT users.user_id, users.username, users.email, users.password, avatar.img_url, avatar.gender, avatar.skin_colour ' +
        'FROM users ' +
        'JOIN avatar ON users.avatar_id = avatar.avatar_id ' +
        'WHERE users.user_id = $1;',
      [user.user_id]
    );

    return response.rows[0];
  }

  static async updateUser(data, token, updateAvatar = false, avatarId = null) {
    try {
      const user = await User.getOneByToken(token);
      const { username, password, email } = data;

      let response;

      if (updateAvatar) {
        // Update both user information and avatar
        response = await db.query(
          'UPDATE users SET username = $1, password = $2, email = $3, avatar_id = $4 WHERE user_id = $5 RETURNING *',
          [username, password, email, avatarId, user.user_id]
        );
      } else {
        // Update only user information
        response = await db.query(
          'UPDATE users SET username = $1, password = $2, email = $3 WHERE user_id = $4 RETURNING *',
          [username, password, email, user.user_id]
        );
      }

      const updatedUser = new User(response.rows[0]);

      if (updateAvatar) {
        // Retrieve joined user and avatar data
        const userData = await db.query(
          'SELECT users.user_id, users.username, users.email, avatar.img_url, avatar.gender, avatar.skin_colour ' +
            'FROM users ' +
            'JOIN avatar ON users.avatar_id = avatar.avatar_id ' +
            'WHERE users.user_id = $1;',
          [updatedUser.user_id]
        );

        if (userData.rows.length === 0) {
          throw new Error('Failed to retrieve user data');
        }

        return userData.rows[0];
      }

      return updatedUser;
    } catch (err) {
      if (
        err.message ===
        'duplicate key value violates unique constraint "users_username_key"'
      ) {
        throw new Error(
          'Username is already taken, try updating to something else'
        );
      } else {
        throw new Error('A failure occurred when updating data');
      }
    }
  }
}

module.exports = User;
