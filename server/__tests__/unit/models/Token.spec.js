const Token = require('../../../models/token')
const db = require('../../../database/connect')
const { v4: uuidv4 } = require("uuid");

jest.mock('uuid')

describe ('Token model', () =>{
    beforeEach(()=> jest.clearAllMocks())

    afterAll(()=> jest.resetAllMocks())

    describe('create', () =>{
        it('should create a new token given the user id', async() =>{
            const userId = 1
            const token = 'test-token' 
            const createdTokenId = 1
            
            uuidv4.mockReturnValue(token);

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows:[{token_id: createdTokenId}]
            })



            await jest.spyOn(Token, 'getOneById').mockResolvedValueOnce({
                token_id: createdTokenId,
                user_id: userId,
                token: token
            })


            const createdToken = await Token.create(userId)

            expect(db.query).toHaveBeenCalledWith('INSERT INTO token (user_id, token) VALUES ($1, $2) RETURNING token_id;', [userId, token])
            expect(Token.getOneById).toHaveBeenCalledWith(createdTokenId)
            expect(createdToken).toHaveProperty('token_id', createdTokenId)
            expect(createdToken).toHaveProperty('user_id', userId)
            expect(createdToken).toHaveProperty('token', token)
        })
    
    })

})