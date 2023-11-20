const db = require('../database/connect');

class Games {
  constructor({ game_id, user_id, date_played, game_status, username }) {
    this.game_id = game_id;
    this.user_id = user_id;
    this.date_played = date_played;
    this.game_status = game_status;
    this.username = username;
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM games');

    if (response.rows.length == 0) {
      throw new Error('No games were found');
    }

    return response.rows.map((g) => new Games(g));
  }

  static async getGamesById(id) {
    try {
      const response = await db.query(
        'SELECT games.game_id, games.user_id, games.date_played, games.game_status, users.username ' +
          'FROM games ' +
          'JOIN users ON games.user_id = users.user_id ' +
          'WHERE games.user_id = $1;',
        [id]
      );

      if (response.rows.length === 0) {
        throw new Error('No games were found for current user');
      }

      return new Games(response.rows[0]);
    } catch (error) {
      console.log('Error in getGamesById method:', error.message);
     
    }
  }

  static async createGame(user_id, data) {
    const {date_played, game_status } = data;

    const response = await db.query(
      'INSERT INTO games(user_id, date_played, game_status) VALUES($1, $2, $3) RETURNING *',
      [user_id, date_played, game_status]
    );

    if (response.rows.length === 0) {
      throw new Error('Failed to create game');
    }

    return response.rows[0];
  }

  static async updateGame(gameId, status) {
    const response = await db.query(
      'UPDATE games SET game_status = $1 WHERE game_id = $2 RETURNING *',
      [status, gameId]
    );

    if (response.rows.length === 0) {
      throw new Error('Failed to update game status');
    }

    return response.rows[0];
  }
}

module.exports = Games;
