const battleController = require('../../../controllers/battle')
const Battle = require('../../../models/battle')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('Battle controller', () => {
    beforeEach(()=> jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('getAll', () => {
        it('should return battle questions with a status code 200', async () => {
            const testBattleQs = [
                {
                  q_battle_id: 1,
                  question: 'Sample question Q1',
                  answer: 'Sample answer A1'
                },
                {
                  q_battle_id: 2,
                  question: 'Sample question Q2',
                  answer: 'Sample answer A2'
                }
              ];
              
            jest.spyOn(Battle, 'getAll').mockResolvedValue(testBattleQs)
        
            await battleController.getAll(null, mockRes)
        
            expect(Battle.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testBattleQs)
            })

      it('sends an error upon fail', async () =>{

        jest.spyOn(Battle,'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))

        await battleController.getAll(null, mockRes)
        expect(Battle.getAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(500)
        expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db'})
      })
    })

    describe('getOneById', () => {
        it('should return a single battle question with a status code 200', async () =>{
            const qBattleId = 1;
            const testBattleQ = {
                q_battle_id: qBattleId,
                question: 'Sample question Q1',
                answer: 'Sample answer A1'
            }

            jest.spyOn(Battle, 'getOneById').mockResolvedValue(testBattleQ);
    
            const mockReq = {
                params: {id: qBattleId}
            }

            await battleController.getOneById(mockReq, mockRes);

            expect(Battle.getOneById).toHaveBeenCalledTimes(1)
            expect(Battle.getOneById).toHaveBeenCalledWith(qBattleId)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testBattleQ)
        })

        it ('should send an error with a status code 404 upon failure', async () =>{
            const qBattleId = 1
            const err = 'Battle question not found'

            jest.spyOn(Battle, 'getOneById').mockRejectedValue(new Error(err));

            const mockReq = {
                params: {id: qBattleId},
            }

            await battleController.getOneById(mockReq, mockRes)

            expect(Battle.getOneById).toHaveBeenCalledTimes(1);
            expect(Battle.getOneById).toHaveBeenCalledWith(qBattleId);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: err });

        })
    })
})