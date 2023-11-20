const db = require('../../../database/connect');
const Games = require('../../../models/games');

describe('Games model', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('getAll', () => {
    it('resolves with all games data', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 1,
            user_id: 1,
            date_played: '2023-11-17T00:00:00.000Z',
            game_status: null,
          },
          {
            game_id: 2,
            user_id: 1,
            date_played: '2023-11-19T00:00:00.000Z',
            game_status: true,
          },
        ],
      });

      const gamesData = await Games.getAll();
      expect(gamesData).toHaveLength(2);
      expect(gamesData[0]).toHaveProperty('game_id');
    });

    it('should throw an Error on database query error', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      try {
        await Games.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No games were found');
      }
    });
  });

  describe('getGamesById', () => {
    it('resolves with game data for the chosen user', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 1,
            user_id: 1,
            date_played: '2023-11-17T00:00:00.000Z',
            game_status: null,
            username: 'test',
          },
        ],
      });

      const userId = 1;
      const getGame = await Games.getGamesById(userId);
      expect(getGame).toHaveProperty('game_id', 1);
      expect(getGame).toHaveProperty('user_id', 1);
      expect(getGame).toHaveProperty('date_played', '2023-11-17T00:00:00.000Z');
      expect(getGame).toHaveProperty('game_status', null);
      expect(getGame).toHaveProperty('username', 'test');
    });

    it('should throw an Error on database query error', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 1,
            user_id: 1,
            date_played: '2023-11-17T00:00:00.000Z',
            game_status: null,
            username: 'test',
          },
        ],
      });

      try {
        const userId = 2;
        await Games.getGamesById(userId);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No games were found for current use');
      }
    });
  });
});
