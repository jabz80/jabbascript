const db = require('../database/connect')

class User {
    constructor({user_id, username, password}){
        this.user_id = user_id;
        this.username = username;
        this.password = password;

    }

    static async checkUsername (username){
        const response = await db.query("SELECT * FROM user WHERE username = $1;", [username])

        if (response.rows.length != 1){
            throw new Error("Unable to locate username!")
        }
        return new User(response.rows[0])
    }

    static async create(data) {
        try{
        const {username, password} = data;
            
        let response = await db.query("INSERT INTO user (username, password) VALUES ($1, $2) RETURNING user_id;", [username, password]) 

        if (response.rows.length === 0) {
            throw new Error ("Failed to create username")
        }
        return response.rows[0]
        } catch(err){ 
            if (err.message === 'duplicate key value violates unique constraint "user_username_key"'){
                throw new Error('Username already exists')
            } else {
                throw new Error('Failed to create username')
            }
        }

    }

    static async getOneById(id){
        const response = await db.query("SELECT * FROM user WHERE user_id = $1", [id])
        
        if (response.rows.length != 1){
            throw new Error("Unable to locate user")
        }
        return new User(response.rows[0])
    }

    static async getOneByToken(token){
        const responseToken = await db.query("SELECT user_id FROM Token WHERE token = $1", [token])
        if (responseToken.rows.length != 1){
            throw new Error ("Unable to locate user")
        }
        const user = await User.getOneById((await responseToken).rows[0].user_id)
        return user
    }

    
}

module.exports = User