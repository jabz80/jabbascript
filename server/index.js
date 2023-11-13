require("dotenv").config()
const app = require("./app")
const port = process.env.PORT

// ! Activate server 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})