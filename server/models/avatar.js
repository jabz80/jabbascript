const db = require('../database/connect');

class Avatar {
  constructor({ avatar_id, img_url, user_id }) {
    this.avatar_id = avatar_id;
    this.img_url = img_url;
    this.user_id = user_id;
  }

  static async getAvatarByAvatar(avatarId) {
    const response = await db.query(
      'SELECT * FROM avatar WHERE avatar_id = $1',
      [avatarId]
    );

    if (response.rows.length != 1) {
      throw new Error('Unable to locate avatar');
    }

    return new Avatar(response.rows[0]);
  }

  static async getAvatarByUser(user_id) {
    const response = await db.query(
      'SELECT users.user_id, users.username, users.password, users.email, avatar.img_url FROM users INNER JOIN avatar ON users.user_id = avatar.user_id WHERE users.user_id = $1',
      [user_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to locate avatar.');
    } else {
      return new Avatar(response.rows[0]);
    }
  }

  static async updateAvatar(data) {
    const { img_url } = data;
    const response = await db.query(
      'UPDATE avatar SET img_url = $1 WHERE avatar_id = $2',
      [img_url, this.avatar_id]
    );
    
    return new Avatar(response.rows[0]);
  }
}

module.exports = Avatar;
