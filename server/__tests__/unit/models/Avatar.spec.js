const Avatar = require('../../../models/avatar');

const db = require('../../../database/connect');

describe('Avatar model', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('getAll', () => {
    it('resolves with all avatars on success', async () => {

        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [
            { avatar_id: 1, img_url: 'https://example.com/avatar1.png' },
            { avatar_id: 2, img_url: 'https://example.com/avatar2.png' },
          ],
        })

        const avatars = await Avatar.getAll()
        expect(avatars).toHaveLength(2)
        expect(avatars[0]).toHaveProperty('avatar_id')

    })

    it('should throw an Error on database query error', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
      try {
        await Avatar.getAll()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('No avatars were found')
      }
    })
    })
})
