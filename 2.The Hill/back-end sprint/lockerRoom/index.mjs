import pg from "pg"
import express, { request, response } from "express"
import bodyParser from "body-parser"
import * as dotenv from "dotenv"
// import  Jwt  from "jsonwebtoken"
dotenv.config()

const client = new pg.Client({
    user: "postgres",
    host: "localhost",
    database:"locker_room",
    password: `${process.env.MYSQL_PASSWORD}`,
    port: 5432,
})

client.connect()

const server = express()
server.use(bodyParser.json())

// Overview
server.get("/LockerRoom", (req, response) =>{
    client.connect((err) =>{
    if(err) {
        console.error("connection error", err.stack)
    } else {
        
    }
})

client.query("SELECT * FROM users" , (err, res) => {
    if(err) throw err
    console.log(res)
    response.send({connection: "successfull", response: res})
        console.log("connected to BD")
        client.end()
})
})

// Create User
server.post("/LockerRoom/CreateUser", (req, res)=>{
    const { id,name,lastname, email, password } = req.body
    client.query(`INSERT INTO users (id, name, lastname, email, password) VALUES ($1, $2, $3, $4, $5)`, [id, name, lastname, email, password])
    console.log(req)
})

// Get User Id 
server.get("/LockerRoom/:id", (request, response) =>{
    const id = parseInt(request.params.id)

    client.query("SELECT * FROM users WHERE id = $1", [id], (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
} )

// Update User by ID 
server.put ("/LockerRoom/:id", (request, response) =>{
    const id = parseInt(request.params.id)
    const { name, lastname, email, password } = request.body

    client.query(
    "UPDATE users SET name = $2, lastname = $3, email = $4, password = $5 WHERE id = $1",
    [ id, name, lastname, email, password, ],
    (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
})

// Delete User
server.delete("/LockerRoom/:id", (request, response) =>{
    const id = parseInt(request.params.id)
    client.query("DELETE FROM users WHERE id = $1", [id], (error, results) =>{
        if(error) {
            throw error
        }
        response.status(200).send(`user deleted with ID: ${id}`)
    })
})






server.listen(3000, () =>{
    console.log("Server running on port 3000")
})