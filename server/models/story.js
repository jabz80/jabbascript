const db = require('../database/connect');

class Story {
  constructor({ q_story_id, question, answer }) {
    this.q_story_id = q_story_id;
    this.question = question;
    this.answer = answer;
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM questions_story');

    if (response.rows.length == 0) {
      throw new Error('No story questions were found');
    }

    return response.rows.map((q) => new Story(q));
  }

  static async getOneById(id) {
    const response = await db.query(
      'SELECT * FROM questions_story WHERE q_story_id = $1',
      [id]
    );

    if (response.rows.length != 1) {
      throw new Error('Unable to locate question');
    }

    return new Story(response.rows[0]);
  }
}

module.exports = Story;
