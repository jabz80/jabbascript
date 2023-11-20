require('dotenv').config()

const request = require('supertest')
const { app } = require('../../app')
const { resetTestDB } = require('../../database/testConnect')


describe('api server', ()=> {
    let api


    beforeAll(() => {
        
        api = app.listen(4000, () => {
            console.log("test running on port 4000")
        })

    }) 

    beforeEach(async() => {
        await resetTestDB()
    })


    afterAll((done)=>{
        api.close(done)
    })

    it ('responds to GET / with a 200', (done) =>{
        request(api)
        .get('/')
        .set('authorization', 'tokenTest1')
        .expect(200,done)
    })

    it ('responds to POST /register with a 201', (done) =>{

        const createUserData = {
            body:{
                username: 'Test-username',
                password: 'Test-password',
                email: 'lyhxr@example.com',
            }
        }
        request(api)
        .post('/register')
        .send(createUserData.body)
        .expect(201,done)
    })

    it ('responds to POST /login with a 200', (done) =>{

        const userLoginDB = {
            body:{
                username: '1',
                password: '1',
            }
        }
        request(api)
        .post('/login')
        .send(userLoginDB.body)
        .expect(200,done)
    })

    it('responds to DELETE /logout with a 204', (done)=>{
        request(api)
        .delete('/logout')
        .set('authorization', 'tokenTest1')
        .expect(204,done)
    })

    it ('responds to GET /token with a 201', (done) =>{
        request(api)
        .get('/token')
        .set('authorization', 'Bearer tokenTest1')
        .expect(201,done)
    })

    it ('responds to PATCH /update with a 200', (done) =>{
        const updateData = {
            body:{
                username: 'Update-username',
                password: 'Update-password',
                email: 'lyhxr@example.com',
                avatar_id: 2
            }
        }

        request(api)
       .patch('/update')
       .send(updateData.body)
       .set('authorization', 'Bearer tokenTest1')
       .expect(200,done)
    })

    it('responds to GET /battle with status 200', (done) =>{

        request(api)
            .get('/battle')
            .set('authorization', 'tokenTest1')
            .expect(200,done)
    })



    it('responds to GET /battle/:id with a 200', (done) =>{
        request (api)
            .get('/battle/2')
            .set('authorization', 'tokenTest2')
            .expect(200,done)
    })

    it('responds to GET /story with status 200', (done) =>{

        request(api)
            .get('/story')
            .set('authorization', 'tokenTest1')
            .expect(200,done)
    })



    it('responds to GET /story/:id with a 200', (done) =>{
        request (api)
            .get('/story/2')
            .set('authorization', 'tokenTest2')
            .expect(200,done)
    })

    it('responds to GET /avatar with status 200', (done) =>{

        request(api)
            .get('/avatar')
            .set('authorization', 'tokenTest1')
            .expect(200,done)
    })

    it('responds to GET /score with status 200', (done) =>{

        request(api)
            .get('/score')
            .set('authorization', 'tokenTest1')
            .expect(200,done)
    })



    it('responds to GET /score/:id with a 200', (done) =>{
        request (api)
            .get('/score/2')
            .set('authorization', 'tokenTest2')
            .expect(200,done)
    })

    it ('responds to PATCH /score/:id with a 200', (done) =>{
        const scoreUpdateData = {
            body:{
                newScore: 100
            }
        }

        request(api)
       .patch('/score/1')
       .send(scoreUpdateData.body)
       .set('authorization', 'Bearer tokenTest1')
       .expect(200,done)
    })

    it('responds to GET /games with status 200', (done) =>{

        request(api)
            .get('/games')
            .set('authorization', 'tokenTest1')
            .expect(200,done)
    })



    it('responds to GET /games/:id with a 200', (done) =>{
        request (api)
            .get('/games/2')
            .set('authorization', 'tokenTest2')
            .expect(200,done)
    })

    it ('responds to POST /games/:id with a 200', (done) =>{

        const createGameData = {
            body:{
              user_id: 1,
              date_played: '2020-01-01',
              game_status: false
            }
        }
        request(api)
        .post('/games/:id')
        .send(createGameData.body)
        .expect(201,done)
    })

    it ('responds to PATCH /games/:id with a 200', (done) =>{
        const gameUpdateData = {
            body:{
                game_status: null
            }
        }

        request(api)
       .patch('/games/1')
       .send(gameUpdateData.body)
       .expect(200,done)
    })
})