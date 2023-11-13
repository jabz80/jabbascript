const db = require('../database/connect');

class Battle {
  constructor({ q_battle_id, question, answer }) {
    this.q_battle_id = q_battle_id;
    this.question = question;
    this.answer = answer;
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM question_battle');

    if (response.rows.length == 0) {
      throw new Error('No battle questions were found');
    }

    return response.rows.map((q) => new Battle(q));
  }

  static async getOneById(id) {
    const response = await db.query(
      'SELECT * FROM question_battle WHERE q_battle_id = $1',
      [id]
    );

    if (response.rows.length != 1) {
      throw new Error('Unable to locate question');
    }

    return new Battle(response.rows[0]);
  }
}

module.exports = Battle;
