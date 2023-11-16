const User = require('../../../models/user')
const db = require('../../../database/connect')

describe ('Users model', () =>{
    beforeEach(()=> jest.clearAllMocks())

    afterAll(()=> jest.resetAllMocks())

    describe('checkUsername', () =>{
        it ('checks if the username exists in the database and returns it', async ()=>{

            const userName = 'constantinos';

            jest.spyOn(db, 'query'). mockResolvedValueOnce({
                rows:[{
                    user_id: 1,
                    username: 'constantinos',
                    password: 'stylianou',
                    email: 'test1@example.com',
                    avatar_id: 1
                }]
            })

          
            const checkUsername = await User.checkUsername(userName)

            expect(checkUsername).toHaveProperty('user_id', 1)
            expect(checkUsername).toHaveProperty('username', userName)
            expect(checkUsername).toHaveProperty('password', 'stylianou')
            expect(checkUsername).toHaveProperty('email', 'test1@example.com')
            
        })

        it ('should throw an Error on database query error', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows:[{
                    user_id: 1,
                    username: 'constantinos',
                    password: 'stylianou',
                    email: 'test@example.com'
                }]
            })

            try{
                userName = 'NOTconstantinos'
                await User.checkUsername(userName)
            } catch (err){
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to locate username!")
            }
        })
    })

    describe('create', () =>{
        it ('should create a username returning the users id on success', async () =>{
            const newUsername = {
                username: 'newConstantinos',
                password: 'newStylianou',
                email: 'test@example.com'
                
            }

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    user_id:1
                }]
            })

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    user_id:1, 
                    username: 'newConstantinos',
                    password: 'newStylianou',
                    email: 'test@example.com',
                    img_url: 'http://example.com'
                }]
            })

            const createdUsername = await User.create(newUsername)

            expect(createdUsername).toHaveProperty('user_id')
            expect(createdUsername).toHaveProperty('username', 'newConstantinos')
            expect(createdUsername).toHaveProperty('password', 'newStylianou')
            expect(createdUsername).toHaveProperty('email', 'test@example.com')
            expect(createdUsername).toHaveProperty('img_url', 'http://example.com')
        })
        
        it ('should throw an error when the database insertion fails', async () => {
            const newUsername = {
                username: 'newConstantinos',
                password: 'newStylianou',
                email: 'test@example.com'
            }

            jest.spyOn(db,'query').mockRejectedValueOnce(new Error("Failed to create username"))

            await expect(User.create(newUsername)).rejects.toThrowError("Failed to create username")
        })

        it ('should throw an error when the username already exists', async()=>{
            const existingUsername = {
                username: 'existingUsername',
                password: 'newStylianou',
                email:'test@example.com'
            }

            jest.spyOn(db, 'query').mockRejectedValueOnce({
                message: 'duplicate key value violates unique constraint "user_username_key"'
            }
            )

            await expect(User.create(existingUsername)).rejects.toThrowError('Username already exists')
        })
    })

    describe ('getOneById', () =>{
        it('should select get user from the user id', async ()=>{
            const userId = 1

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    user_id: userId, 
                    username: 'Constantinos',
                    password: 'Stylianou',
                    email: 'test@example.com'}]
                }
                )

            const user = await User.getOneById(userId)

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE user_id = $1', [userId])
            expect(user).toHaveProperty('user_id', userId)
            expect(user).toHaveProperty('username', 'Constantinos')
            expect(user).toHaveProperty('password', 'Stylianou')
            expect(user).toHaveProperty('email', 'test@example.com')
        })

        it('should throw an error when the user does not exist', async () => {
            const userId = 1
        
            jest.spyOn(db, 'query').mockResolvedValueOnce({
              rows: [],
            })
        
            await expect(User.getOneById(userId)).rejects.toThrow('Unable to locate user')
          })
    })

    describe('getOneByToken', () => {
        it('should retrieve a user based on a valid token', async () => {
          const token = 'test-token';
          const userId = 1
      
          jest.spyOn(db, 'query').mockResolvedValueOnce({
            rows: [{ user_id: userId }],
          })

          jest.spyOn(db, 'query').mockResolvedValueOnce({
            rows: [{
                user_id:1, 
                username: 'TestUser',
                password: 'TestPassword',
                email: 'test@example.com',
                img_url: 'http://example.com'
            }]
        })


      
          const expectedUser = {
            user_id: userId,
            username: 'TestUser',
            password: 'TestPassword',
            email: 'test@example.com',
            img_url: 'http://example.com'
        }
          jest.spyOn(User, 'getOneById').mockResolvedValueOnce(expectedUser);
      
          const user = await User.getOneByToken(token);
      
          expect(db.query).toHaveBeenCalledWith('SELECT user_id FROM token WHERE token = $1', [token]);
          expect(User.getOneById).toHaveBeenCalledWith(userId);
          expect(user).toEqual(expectedUser);
        })
      
        it('should throw an error when the token does not exist', async () => {
          const token = 'wrong-token';
      
          jest.spyOn(db, 'query').mockResolvedValueOnce({
            rows: [],
          })
      
          await expect(User.getOneByToken(token)).rejects.toThrow('Unable to locate user');
        })
      })


      describe('updateUser', () => {
        it('should update a user based on a valid token', async () => {
        const token = 'test-token';

        const user = {
            user_id:1,
            username: 'Constantinos',
            password: 'Stylianou',
            email: '@example.com'
        }

        jest.spyOn(User, 'getOneByToken').mockResolvedValueOnce(user)

        const updateData = {
            username: 'updateConstantinos',
            password: 'updateStylianou',
            email: 'updateTest@example.com',
            avatar_id: 1

        }

        const updatedUsername = {
            user_id:1,
            username: 'updateConstantinos',
            password: 'updateStylianou',
            email: 'updateTest@example.com',
            avatar_id: 1
        }

        jest.spyOn(db, 'query').mockResolvedValueOnce({
            rows: [updatedUsername]
        })

        const result = await User.updateUser(updateData, token)

        expect(User.getOneByToken).toHaveBeenCalledWith(token)
        expect(db.query).toHaveBeenCalledWith('UPDATE users SET username = $1, password = $2, email = $3 WHERE user_id = $4 RETURNING *', [updateData.username, updateData.password, updateData.email, user.user_id])
        expect(result).toEqual(new User(updatedUsername))
      })

      it('should throw an error when invalid token', async () => {
        const token = 'nonexistent-token';
    
        jest.spyOn(User, 'getOneByToken').mockImplementationOnce(async () => {
          throw new Error('A failure occurred when updating data');
        });
    
        await expect(User.updateUser({}, token)).rejects.toThrow('A failure occurred when updating data');
      })

    })

})