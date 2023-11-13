const db = require('../database/connect')
const { v4: uuidv4 } = require("uuid");

class Token {
    constructor({token_id, user_id, token})

    {
        this.token_id = token_id
        this.user_id = user_id
        this.token = token
    }

    static async create(user_id){
        // UUID4 > generates 36 character random string
        const token = uuidv4();

        console.log("user id >");
        console.log(user_id)
        
        console.log("Entering SQL query")

        // Inserting the new token into the database for the corresponding user ID
        const response = await db.query("INSERT INTO token (user_id, token) VALUES ($1, $2) RETURNING token_id;",
            [user_id, token]);

        // Return the new information inserted into the table
            // = {}
        const newId = response.rows[0].token_id;

        // Create a new object from newID
            // Returns> Token {token_id, user_id, token}
        const newToken = await Token.getOneById(newId);
        
        return newToken;
        
    }


    static async getOneById(token_id) {
        const response = await db.query("SELECT * FROM token WHERE token_id = $1", [token_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }



    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM token WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    async destroyToken() {
        try {
            const response = await db.query("DELETE FROM token WHERE token_id = $1 RETURNING *;", [this.token_id]);
            if (response.rows.length === 0) {
                return null; 
            }
            return new Token(response.rows[0]);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async getByUser(user_id) {
        const response = await db.query("SELECT * FROM token WHERE user_id = $1", [user_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

}

module.exports = Token