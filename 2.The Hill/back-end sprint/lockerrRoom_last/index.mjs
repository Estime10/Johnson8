import pg from "pg"
import express from "express"
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

const app = express()
app.use(bodyParser.json())

app.post("/register", (req, res)=>{
    const { id,name,lastname, email, password } = req.body
    client.query(`INSERT INTO users (id, name, lastname, email, password) VALUES ($1, $2, $3, $4, $5)`, [id, name, lastname, email, password])

    
})



app.listen(3000, () =>{
    console.log("Server running on port 3000")
})