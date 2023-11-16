const db = require('../database/connect');

class Score {
  constructor({ score_id, user_id, score }) {
    this.score_id = score_id;
    this.user_id = user_id;
    this.score = score;
  }

  // When user is added we want to set score to 0 for that user

  static async getAll() {
    const response = await db.query(
      'SELECT user_score.user_id, user_score.score_id, user_score.score, users.username ' +
        'FROM user_score ' +
        'JOIN users ON user_score.user_id = users.user_id '
    );

    return response.rows.map((s) => new Score(s));
  }

  static async getScoreByUser(id) {
    const response = await db.query(
      'SELECT user_score.user_id, user_score.score_id, user_score.score, users.username ' +
        'FROM user_score ' +
        'JOIN users ON user_score.user_id = users.user_id ' +
        'WHERE user_score.user_id = $1;',
      [id]
    );

    return response.rows[0];
  }
}

module.exports = Score;
