const Score = require('../../../models/score');
const db = require('../../../database/connect');

describe('Score model', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('getAll', () => {
    it('resolves with all score data', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          { username: 'test', score: 5 },
          { username: 'test2', score: 10 },
        ],
      });

      const userScores = await Score.getAll();
      expect(userScores).toHaveLength(2);
      expect(userScores[0]).toHaveProperty('user_id');
    });

    it('should throw an Error on database query error', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      try {
        await Score.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No user scores were found');
      }
    });
  });

  describe('getScoreByUserId', () => {
    it('resolves with score data for the chosen user', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [{ user_id: 1, score_id: 1, score: 5, username: 'test' }],
      });
      const userId = 1;
      const userScore = await Score.getScoreByUser(userId);
      expect(userScore).toHaveProperty('score_id');
      expect(userScore).toHaveProperty('user_id', 1);
      expect(userScore).toHaveProperty('score', 5);
      expect(userScore).toHaveProperty('username', 'test');
    });

    it('should throw an Error on database query error', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [{ user_id: 1, score_id: 1, score: 5, username: 'test' }],
      });

      try {
        const userId = 2;
        await Score.getScoreByUser(userId);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate user score');
      }
    });
  });

  describe('updateScore', () => {
    it('should update user score for one user', async () => {
      const userScore = {
        score_id: 1,
        user_id: 1,
        score: 5,
      };

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [userScore],
      });

      const updatedScore = {
        user_id: 1,
        username: 'test',
        score: 10,
      };

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [updatedScore] });

      const userId = 1;
      const newScore = 10;

      const update = await Score.updateScore(userId, newScore);

      expect(update).toHaveProperty('user_id', 1);
      expect(update).toHaveProperty('username', 'test')
      expect(update).toHaveProperty('score', 10)
    });
  });
});
