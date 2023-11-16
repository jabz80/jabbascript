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

  static async updateScore(userId, newScore) {
    try {
      // Update the score for the specified user
      const response = await db.query(
        'UPDATE user_score SET score = $1 WHERE user_id = $2 RETURNING *',
        [newScore, userId]
      );

      if (response.rows.length === 0) {
        throw new Error('Failed to update score');
      }

      // Retrieve joined user and score data
      const userData = await db.query(
        'SELECT users.user_id, users.username, user_score.score ' +
          'FROM users ' +
          'JOIN user_score ON users.user_id = user_score.user_id ' +
          'WHERE users.user_id = $1;',
        [userId]
      );

      if (userData.rows.length === 0) {
        throw new Error('Failed to retrieve user and score data');
      }

      return userData.rows[0];
    } catch (err) {
      throw new Error('A failure occurred when updating score');
    }
  }
}

module.exports = Score;
