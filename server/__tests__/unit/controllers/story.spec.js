const storyController = require('../../../controllers/story')
const Story = require('../../../models/story')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('Story controller', () => {
    beforeEach(()=> jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('getAll', () => {
        it('should return story questions with a status code 200', async () => {
            const testStoryQs = [
                {
                  q_story_id: 1,
                  question: 'Sample question Q1',
                  answer: 'Sample answer A1'
                },
                {
                  q_story_id: 2,
                  question: 'Sample question Q2',
                  answer: 'Sample answer A2'
                }
              ];
              
            jest.spyOn(Story, 'getAll').mockResolvedValue(testStoryQs)
        
            await storyController.getAll(null, mockRes)
        
            expect(Story.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testStoryQs)
            })

      it('sends an error upon fail', async () =>{

        jest.spyOn(Story,'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))

        await storyController.getAll(null, mockRes)
        expect(Story.getAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(500)
        expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db'})
      })
    })

    describe('getOneById', () => {
        it('should return a single story question with a status code 200', async () =>{
            const qStoryId = 1;
            const testStoryQ = {
                q_story_id: qStoryId,
                question: 'Sample question Q1',
                answer: 'Sample answer A1'
            }

            jest.spyOn(Story, 'getOneById').mockResolvedValue(testStoryQ);
    
            const mockReq = {
                params: {id: qStoryId}
            }

            await storyController.getOneById(mockReq, mockRes);

            expect(Story.getOneById).toHaveBeenCalledTimes(1)
            expect(Story.getOneById).toHaveBeenCalledWith(qStoryId)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testStoryQ)
        })

        it ('should send an error with a status code 404 upon failure', async () =>{
            const qStoryId = 1
            const err = 'Story question not found'

            jest.spyOn(Story, 'getOneById').mockRejectedValue(new Error(err));

            const mockReq = {
                params: {id: qStoryId},
            }

            await storyController.getOneById(mockReq, mockRes)

            expect(Story.getOneById).toHaveBeenCalledTimes(1);
            expect(Story.getOneById).toHaveBeenCalledWith(qStoryId);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: err });

        })
    })
})