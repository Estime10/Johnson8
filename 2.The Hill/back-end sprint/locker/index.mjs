import express from "express"
import bodyPaser from "body-parser"
import cors from "cors"
import dbConnect from "./db/dbConnect.mjs"
import createUser from "./queries/createUsers.mjs"
import getUsers from "./getUsers.mjs"




const app = express()
const port = 3000

dbConnect()

app.use (bodyPaser.json())

app.get("/", (req, res) =>{
    res.json({ info: "creation/DB, virtual Chat"})
})

app.post("/post", (req, res) =>{
    console.log(req.body)
    console.log(res)
})


app.get("/users", getUsers)
app.post("/users", createUser)




app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})