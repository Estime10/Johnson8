import express from "express"
import bodyParser from "body-parser"
import dbConnect from "./database/dbConnect.mjs"
import createUseer from "./query/createUser.mjs"
import deleteUser from "./query/deleteUser.mjs"
import getUserById from "./query/getUserID.mjs"
import getUsers from "./query/getUserS.mjs"
import updateUser from "./query/updateUser.mjs"

const app = express()
const port = 3000

dbConnect()

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get("/", (req, res) => {
    res.json({ info : "Node.js, Express and Postegress API"})
})


app.post("/", (req, res) => {

    console.log(req.body)
    console.log(res)
})

app.get("/users", getUsers)
app.get("/users/:id", getUserById)
app.post("/users", createUseer)
app.put("/users/:id", updateUser)
app.delete("/users/:id", deleteUser)


app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})