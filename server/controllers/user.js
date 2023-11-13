const User = require("../models/user")
const bcrypt = require("bcrypt")
const Token = require("../models/token")

const register = async (req,res) => {
    try{
        const data = req.body

        //Generate salt with specific cost
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        //Hash the password
        const hash = await bcrypt.hash(data.password, salt);
        data.password = hash

        const result = await User.create(data)
        console.log(result)
        const token = await Token.create(result.user_id)

        res.status(201).json({authenticated: true, token: token.token})
        // res.status(201).send(result)

    } catch (err){
        res.status(401).json({error: err.message})
    }
}

const logIn = async (req,res) => {
    try{
        // Storing the data from req.body
        const {username,password,lastLoggedIn,streak} = req.body
        // Check if username exists 
        const user = await User.checkUsername(username)
        // Compare passwords using bcrypt 
        const legit = await bcrypt.compare(password, user.password)

        
        // Checking if the password is correct 
        if (!legit){
            throw new Error ("Username and password does not match")
        } else {
            try {
                const prevToken = await Token.getByUser(user.user_id)
                const result = await prevToken.destroyToken()
            } catch (err) {
            }finally{
                const token = await Token.create(user.user_id)
                // Sending a response to the client 
                res.status(200).json({token:
                token.token})
            }
            }
    } catch (err){
        res.status(401).json({error: err.message})
    }
}

const logOut = async (req,res) => {
    try {
        const token = req.headers["authorization"]
        const fullToken = await Token.getOneByToken(token)
        const result = await fullToken.destroyToken()
        res.status(204).json(result)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

const findByToken = async (req, res) => {
    try{
        const token = req.headers["authorization"]
        const user = await User.getOneByToken(token)
        res.status(201).json(user)
    }catch(err){
        res.status(404).json({error: err.message})
    }
}


module.exports = { logIn, register, logOut, findByToken}
