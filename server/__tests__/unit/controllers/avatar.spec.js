const avatarController = require('../../../controllers/avatar')
const Avatar = require('../../../models/avatar')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('Avatar controller', () => {
    beforeEach(()=> jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('getAll', () => {
        it('should return avatars with a status code 200', async () => {
            const testAvatars = [
                {
                  avatar_id: 1,
                  img_url: 'https://www.google.com/images/branding/googlelogo/2x/google'
                },
                {
                  avatar_id: 2,
                  img_url: 'https://www.google.com/images/branding/googlelogo/3x/google'
                }
              ];
              
            jest.spyOn(Avatar, 'getAll').mockResolvedValue(testAvatars)
        
            await avatarController.getAll(null, mockRes)
        
            expect(Avatar.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testAvatars)
            })

      it('sends an error upon fail', async () =>{

        jest.spyOn(Avatar,'getAll').mockRejectedValue(new Error('Something happened to your db'))

        await avatarController.getAll(null, mockRes)
        expect(Avatar.getAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(500)
        expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db'})
      })
    })
})

