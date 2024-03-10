const Battle = require('../../../models/battle')

const db = require('../../../database/connect')

describe('Battle model', () => {
    beforeEach(()=> jest.clearAllMocks())

    afterAll(()=> jest.resetAllMocks())

    describe('getAll', ()=> {
        it('resolves with all battle questions on success', async () =>{


            jest.spyOn(db, 'query').mockResolvedValueOnce({
                
                rows: [{question: 'Sample question 1', answer:'Sample answer 1'}, 
                {question: 'Sample question 2', answer:'Sample answer 2'}
            ]
            })

            const battleQs = await Battle.getAll()
            expect(battleQs).toHaveLength(2)
            expect(battleQs[0]).toHaveProperty('q_battle_id')
        })

        it ('should throw an Error on database query error', async () =>{


            jest.spyOn(db,'query').mockResolvedValueOnce({ rows: []})

            try {
                await Battle.getAll()
            } catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("No battle questions were found")
            }
        })
    })

    describe('getOneById', ()=> {
        it ('resolves with battle question of specified id on success', async ()=>{

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    q_battle_id: 1,
                    question: 'Sample question 1', 
                    answer:'Sample answer 1'
                }]
            })

            const qBattleId = 1
            const battleQ = await Battle.getOneById(qBattleId)
            expect(battleQ).toHaveProperty('q_battle_id', 1)
            expect(battleQ).toHaveProperty('question', 'Sample question 1')
            expect(battleQ).toHaveProperty('answer', 'Sample answer 1')
        })

        it ('should throw an Error on database query error', async () =>{

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                  q_battle_id: 1,
                  question: 'Sample question 1', 
                  answer:'Sample answer 1'
                }]
            })

            try {
                const qBattleId = 2
                await Battle.getOneById(qBattleId)
            } catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to locate question")
            }
        })
    })
})
