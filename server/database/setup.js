const fs = require("fs")
require("dotenv").config()
const path = require("path")
const db = require("./connect")

const sql = fs.readFileSync(path.join(__dirname + "/setup.sql")).toString()

db.query(sql)
    .then (async (data) =>{
        db.end()
        console.log("Setup is complete")
    })
    .catch(error => console.log(error))








