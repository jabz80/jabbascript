// Importing modules
const express = require("express")
const cors = require("cors")


// Importing routers
const userRouter = require("./routes/user")

const path = require("path")

// Create server
const app = express()

// Middleware 
app.use(express.json())
app.use(cors())
// app.use(logger)

// Using the routers 
app.use("/", userRouter)


// Exporting the server
module.exports = app

