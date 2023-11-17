const Story = require('../../../models/story')

const db = require('../../../database/connect')

describe('Story model', () => {
    beforeEach(()=> jest.clearAllMocks())

    afterAll(()=> jest.resetAllMocks())

    describe('getAll', ()=> {
        it('resolves with all story questions on success', async () =>{


            jest.spyOn(db, 'query').mockResolvedValueOnce({
                
                rows: [{section_id: 1, title:'Sample title 1', explanation: 'Explanation 1', example: 'Example 1'}, 
                {section_id: 2, title:'Sample title 2', explanation: 'Explanation 2', example: 'Example 2'}
            ]
            })

            const storyQs = await Story.getAll()
            expect(storyQs).toHaveLength(2)
            expect(storyQs[0]).toHaveProperty('q_story_id')
        })

        it ('should throw an Error on database query error', async () =>{


            jest.spyOn(db,'query').mockResolvedValueOnce({ rows: []})

            try {
                await Story.getAll()
            } catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("No story questions were found")
            }
        })
    })

    describe('getOneById', ()=> {
        it ('resolves with story question of specified id on success', async ()=>{

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    q_story_id: 1,
                    section_id: 1, 
                    title:'Sample title 1', 
                    explanation: 'Explanation 1', 
                    example: 'Example 1'
                }]
            })

            const qStoryId = 1
            const storyQ = await Story.getOneById(qStoryId)
            expect(storyQ).toHaveProperty('q_story_id', 1)
            expect(storyQ).toHaveProperty('section_id', 1)
            expect(storyQ).toHaveProperty('title', 'Sample title 1')
            expect(storyQ).toHaveProperty('explanation', 'Explanation 1')
            expect(storyQ).toHaveProperty('example', 'Example 1')
        })

        it ('should throw an Error on database query error', async () =>{

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    q_story_id: 1,
                    question: 'Sample story Q1',
                    answer: 'Sample story A1'
                }]
            })

            try {
                const qStoryId = 2
                await Story.getOneById(qStoryId)
            } catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to locate question")
            }
        })
    })
})