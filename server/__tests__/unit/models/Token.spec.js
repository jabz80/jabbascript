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

    describe ('getOneById', () =>{
        it('should select data from token table from the token id', async ()=>{
            const tokenId = 1

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    token_id: tokenId, 
                    user_id: 1,
                    token: 'test-token'}]
                })

            const tokenResult = await Token.getOneById(tokenId)

            expect(db.query).toHaveBeenCalledWith("SELECT * FROM token WHERE token_id = $1", [tokenId])
            expect(tokenResult).toHaveProperty('token_id', tokenId)
            expect(tokenResult).toHaveProperty('user_id', 1)
            expect(tokenResult).toHaveProperty('token', 'test-token')

        })
        
        it ('should throw an error if the token id is not found', async ()=>{
            const suppliedTokenId = 1

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: []
                })

                await expect(Token.getOneById(suppliedTokenId)).rejects.toThrow('Unable to locate token.')
        })
    })

    describe ('getOneByToken', () =>{
        it('should select data from token table from the token itself', async ()=>{
            const sampleToken = 'test-token'

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    token_id: 1, 
                    user_id: 1,
                    token: sampleToken}]
                })

            const tokenResult = await Token.getOneByToken(sampleToken)

            expect(db.query).toHaveBeenCalledWith("SELECT * FROM token WHERE token = $1", [sampleToken])
            expect(tokenResult).toHaveProperty('token_id', 1)
            expect(tokenResult).toHaveProperty('user_id', 1)
            expect(tokenResult).toHaveProperty('token', sampleToken)
        })

        it ('should throw an error if the token is not found', async ()=>{
            const suppliedToken = "incorrect-token"

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: []
                })

                await expect(Token.getOneByToken(suppliedToken)).rejects.toThrow('Unable to locate token.')
        })
    })

    describe ('destroyToken', ()=>{
        it('should delete a token given the token id on sign-up', async ()=>{
            const tokenSignInId = 1

            const deletedToken = new Token({
                token_id: tokenSignInId,
                user_id: 1,
                token: 'test-token'
            })

            jest.spyOn(db, 'query').mockResolvedValueOnce({rows:[deletedToken]})

            const result = await deletedToken.destroyToken()

            expect(db.query).toHaveBeenCalledWith('DELETE FROM token WHERE token_id = $1 RETURNING *;', [tokenSignInId])
            expect(result).toEqual(deletedToken)
        })
    

        it('should return null if no token is deleted', async () => {
        const tokenSignInId = 1
    
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [],
        })
    
        const result = await new Token({ token_id: tokenSignInId }).destroyToken();
    
        expect(db.query).toHaveBeenCalledWith('DELETE FROM token WHERE token_id = $1 RETURNING *;', [tokenSignInId]);
        expect(result).toBeNull()
        })
    
        it('should throw an error if there is an issue with the database query', async () => {
        const tokenSignInId = 1
    
        jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('Database error'));
    
        await expect(new Token({ token_id: tokenSignInId }).destroyToken()).rejects.toThrow('Database error');
    
        expect(db.query).toHaveBeenCalledWith('DELETE FROM token WHERE token_id = $1 RETURNING *;', [tokenSignInId]);
      })

    })
})