const db = require('../database/connect')

class Avatar {
    constructor({ avatar_id, img_url }) {
      this.avatar_id = avatar_id;
      this.img_url = img_url;
    }
  
    static async getAll() {
      const response = await db.query('SELECT * FROM avatar');
  
      if (response.rows.length == 0) {
        throw new Error('No avatars were found');
      }
  
      return response.rows.map((a) => new Avatar(a));
    }
}

module.exports = Avatar