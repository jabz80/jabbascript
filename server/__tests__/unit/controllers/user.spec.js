const userController = require('../../../controllers/user')
const User = require('../../../models/user')

const bcrypt = require('bcrypt')
const Token = require('../../../models/token')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('user controller', () => {
    beforeEach(()=> jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('register', () => {
        it ('should register a new user and hash the password. Returns a status code 201', async () =>{
            const mockReq = {
                body: {
                username: "newUser",
                password: "newPassword",
                email: "test@example.com"
                }
            }

            jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(parseInt(process.env.BCRYPT_SALT_ROUNDS))

            jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword')

            const userCreated = {
                username: "newUser",
                password: "hashedPassword",
                email: "test@example.com",
                img_url: "DefaultTestUrl.com"
            }

            const tokenData = {
                token: "token-test"
            }


            jest.spyOn(User,'create').mockResolvedValue(userCreated)

            jest.spyOn(Token, 'create').mockResolvedValue(tokenData)

            const expectedResponse = {
                authenticated: true,
                token: tokenData.token,
                data: userCreated
              }

            await userController.register(mockReq, mockRes)

            expect(bcrypt.genSalt).toHaveBeenCalledWith(parseInt(process.env.BCRYPT_SALT_ROUNDS))
            expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', parseInt(process.env.BCRYPT_SALT_ROUNDS))
            
            expect(User.create).toHaveBeenCalledWith({
                username: 'newUser',
                password: 'hashedPassword',
                email: 'test@example.com'
            })

            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith(expectedResponse)

        })

        it ('should handle errors and return a status code 401 with an error message', async () =>{
            const mockReq = {
                body: {
                username: "newUser",
                password: "newPassword",
                email: "test@example.com"
                }
            }

            jest.spyOn(bcrypt, 'genSalt').mockRejectedValue(new Error ("Bcrypt error"))

            await userController.register(mockReq,mockRes)

            expect(bcrypt.genSalt).toHaveBeenCalledWith(parseInt(process.env.BCRYPT_SALT_ROUNDS))

            expect(bcrypt.hash).not.toHaveBeenCalled()
            expect(User.create).not.toHaveBeenCalled()

            expect(mockStatus).toHaveBeenCalledWith(401)
            expect(mockJson).toHaveBeenCalledWith({error: "Bcrypt error"})

        })
    })

    describe ('logIn', () =>{
        it ('should log in user, destroy previous token, create a new token, and return status 200', async ()=>{
            const mockReq = {
                body: {
                    username: "existingUsername",
                    password: "matchingPassword"
                }
            }

            const userData = {
                user_id:1,
                username: "existingUsername",
                password: "correctPasswordHashed"
            }

            const prevTokenData = new Token({
                token: "old-token-test"
            })

            const newTokenData = {
                token: "new-token-test"
            }

            jest.spyOn(User,'checkUsername').mockResolvedValue(userData)
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
            jest.spyOn(Token, 'getByUser').mockResolvedValue(prevTokenData) 

            jest.spyOn(prevTokenData, 'destroyToken').mockResolvedValue(null)

            jest.spyOn(Token, 'create').mockResolvedValue(newTokenData)

            await userController.logIn(mockReq, mockRes)

            expect(User.checkUsername).toHaveBeenCalledWith('existingUsername')
            expect(bcrypt.compare).toHaveBeenCalledWith(mockReq.body.password, userData.password)
            expect(Token.getByUser).toHaveBeenCalledWith(userData.user_id)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({token: newTokenData.token})

        })

        it('should identify incorrect password and return status 401', async () =>{
            const mockReq = {
                body:{
                    username:'existingUsername',
                    password:'incorrectPassword'
                }
            }

            const userData = {
                user_id:1,
                username: 'existingUsername',
                password: 'correctPasswordHashed'
            }

            jest.spyOn(User, 'checkUsername').mockResolvedValue(userData)
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)

            await userController.logIn(mockReq, mockRes)

            expect(User.checkUsername).toHaveBeenCalledWith(userData.username)
            expect(bcrypt.compare).toHaveBeenCalledWith(mockReq.body.password, userData.password)
            expect(mockStatus).toHaveBeenCalledWith(401)
            expect(mockJson).toHaveBeenCalledWith({error: 'Username and password does not match'})
        })

       it ('should identify incorrect username and return status 401', async () =>{
            const mockReq = {
                body:{
                    username: 'incorrectUser',
                    password: 'correctPassword'
                }
            }

            jest.spyOn(User, 'checkUsername').mockRejectedValue(new Error('User not found'))

            await userController.logIn(mockReq, mockRes)

            expect(User.checkUsername).toHaveBeenCalledWith(mockReq.body.username)
            expect(mockStatus).toHaveBeenCalledWith(401)
            expect(mockJson).toHaveBeenCalledWith({error: 'User not found'})

       }) 
    })

    describe ('logOut', () =>{
        it('should log out user, destroy token and return a status 204', async() =>{
            
        
            const tokenInstance = new Token({
                token_id: 1,
                user_id:1,
                token: 'token-test'
            })

            const mockReq = {headers: { authorization: 'test-token'}}


            jest.spyOn(Token, 'getOneByToken').mockResolvedValue(tokenInstance)
            jest.spyOn(tokenInstance, 'destroyToken').mockResolvedValue({message:'Token destroyed'})

            await userController.logOut(mockReq, mockRes)

            expect (Token.getOneByToken).toHaveBeenCalledTimes(1)
            expect(Token.getOneByToken).toHaveBeenCalledWith('test-token')
            expect(tokenInstance.destroyToken).toHaveBeenCalledTimes(1)

            expect(mockStatus).toHaveBeenCalledWith(204)

            expect(mockJson).toHaveBeenCalledWith({message:'Token destroyed'})
        })

        it ('should handle errors and return status code 404', async () =>{

            const tokenInstance = new Token({
                token_id: 1,
                user_id:1,
                token: 'test-token'
            })

            const mockReq = {headers: { authorization: 'test-token'}}


            jest.spyOn(Token, 'getOneByToken').mockResolvedValue(tokenInstance)
            jest.spyOn(tokenInstance, 'destroyToken').mockRejectedValue(new Error("Failed to delete token"))


            await userController.logOut(mockReq, mockRes)

            expect(Token.getOneByToken).toHaveBeenCalledTimes(1)
            expect(Token.getOneByToken).toHaveBeenCalledWith('test-token')

            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: "Failed to delete token"})

        })
    })

    describe ('findByToken', () =>{
        it ('should find user by their token and return 201', async () =>{

            const userData = {
                user_id:1,
                username: 'existingUsername',
                password: 'correctPasswordHashed',
                img_url: 'DefaultTestUrl.com'
            }

            const mockReq = {headers: { authorization: 'Bearer test-token'}}

            jest.spyOn(User, 'getOneByToken').mockResolvedValue(userData)

            await userController.findByToken(mockReq, mockRes)

            expect(User.getOneByToken).toHaveBeenCalledTimes(1)
            expect(User.getOneByToken).toHaveBeenCalledWith('test-token')
        })

        it ('should handle errors and return status code 404', async () =>{

            const mockReq = {
                headers: {
                  authorization: 'Bearer test-token', // Replace with an invalid token
                }}

            jest.spyOn(User, 'getOneByToken').mockRejectedValue(new Error("Failed to find user"))

            await userController.findByToken(mockReq, mockRes)

            expect(User.getOneByToken).toHaveBeenCalledTimes(1)
            expect(User.getOneByToken).toHaveBeenCalledWith('test-token')

            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: "Failed to find user"})
        })
    })

    describe ('updateUser', () =>{
        it ('should update user and return 200', async () =>{
            const mockToken = 'Bearer test-token'
   

            const mockReq = {
                headers: {
                  authorization: mockToken, // Replace with an invalid token
                },
                body: {
                    username: 'newUser',
                    password: 'newPassword',
                    email: 'test@example.com',
                    avatar_id: 1
                }
            }


            const updatedUserData= {
                headers: {
                  authorization: mockToken, 
                },
                body: {
                    username: 'newUser',
                    password: 'newPassword',
                    email: 'test@example.com',
                    img_url: 'DefaultURL'
                }
            }

            jest.spyOn(User, 'getOneByToken').mockResolvedValue(updatedUserData)

            jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(parseInt(process.env.BCRYPT_SALT_ROUNDS))

            jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword')

            jest.spyOn(User, 'updateUser').mockResolvedValue(updatedUserData)

            await userController.updateUser(mockReq, mockRes)

            expect(bcrypt.genSalt).toHaveBeenCalledWith(parseInt(process.env.BCRYPT_SALT_ROUNDS))
            expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', parseInt(process.env.BCRYPT_SALT_ROUNDS))
            expect(mockReq.body.password).toBe('hashedPassword')
            expect(User.getOneByToken).toHaveBeenCalledWith('test-token')
            expect(User.updateUser).toHaveBeenCalledWith(mockReq.body, 'test-token', true, 1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(updatedUserData)
          

        })

        it ('should handle errors and return status code 404', async () =>{
            const mockToken = 'Bearer test-token'
   

            const mockReq = {
                headers: {
                  authorization: mockToken, // Replace with an invalid token
                },
                body: {
                    username: 'newUser',
                    password: 'newPassword',
                    email: 'test@example.com',
                    avatar_id:1
                }
            }

            const editedToken = mockReq.headers.authorization.split(' ')[1]

            const errorMessage = 'User update failed'

            jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(parseInt(process.env.BCRYPT_SALT_ROUNDS))
            jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword')

            jest.spyOn(User, 'updateUser').mockRejectedValue(new Error(errorMessage))

            await userController.updateUser(mockReq, mockRes)

            expect(bcrypt.genSalt).toHaveBeenCalledWith(parseInt(process.env.BCRYPT_SALT_ROUNDS))
            expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', parseInt(process.env.BCRYPT_SALT_ROUNDS))
            expect(mockReq.body.password).toBe('hashedPassword')

            expect(User.updateUser).toHaveBeenCalledWith(mockReq.body, editedToken, true, 1)

            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: errorMessage })

        })
    })
})
