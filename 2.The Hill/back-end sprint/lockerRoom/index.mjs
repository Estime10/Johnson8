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



server.get("/LockerRoom/table", (req, response) =>{
  
        const table = `
// DROP TABLE IF EXISTS users; 
//   CREATE SEQUENCE users_seq;
//   CREATE TABLE users (
//     id SERIAL NULL,
//     name VARCHAR(25) NOT NULL,
//     lastname VARCHAR(25) NOT NULL,
//     email VARCHAR(25) NOT NULL,
//     password VARCHAR(10) NOT NULL,
//     PRIMARY KEY (id)
//   );
    
  DROP TABLE IF EXISTS messages;
  CREATE SEQUENCE messages_seq;
  CREATE TABLE messages (
    id SERIAL NOT NULL,
    id_users INTEGER NOT NULL,
    id_lobbies INTEGER NOT NULL,
    content VARCHAR(1) NOT NULL,
    PRIMARY KEY (id)
  );
  
  DROP TABLE IF EXISTS lobbies;
  CREATE SEQUENCE lobbies_seq;
  CREATE TABLE lobbies (
    id SERIAL,
    id_users INTEGER NOT NULL,
    PRIMARY KEY (id)
  );
  
  DROP TABLE IF EXISTS users_per_lobby;
  CREATE SEQUENCE users_per_lobby_seq;
  CREATE TABLE users_per_lobby (
    id SERIAL,
    id_users INTEGER NOT NULL,
    id_lobbies INTEGER NOT NULL,
    PRIMARY KEY (id)
  );
  
  DROP TABLE IF EXISTS teams;
  CREATE SEQUENCE teams_seq;
  CREATE TABLE teams (
    id SERIAL,
    PRIMARY KEY (id)
  );
  
  DROP TABLE IF EXISTS users_per_team;
  CREATE SEQUENCE users_per_team_seq;
  CREATE TABLE users_per_team (
    id SERIAL,
    id_users INTEGER NOT NULL,
    id_teams INTEGER NOT NULL,
    PRIMARY KEY (id)
  );
    
  ALTER TABLE messages ADD FOREIGN KEY (id_users) REFERENCES users (id);
  ALTER TABLE messages ADD FOREIGN KEY (id_lobbies) REFERENCES lobbies (id);
  ALTER TABLE lobbies ADD FOREIGN KEY (id_users) REFERENCES users (id);
  ALTER TABLE users_per_lobby ADD FOREIGN KEY (id_users) REFERENCES users (id);
  ALTER TABLE users_per_lobby ADD FOREIGN KEY (id_lobbies) REFERENCES lobbies (id);
  ALTER TABLE users_per_team ADD FOREIGN KEY (id_users) REFERENCES users (id);
  ALTER TABLE users_per_team ADD FOREIGN KEY (id_teams) REFERENCES teams (id);
  `

client.query(table, (err, res) =>{
    if(err) {
        console.error(err)
        return
    }
    response.send({connection: "successfull", response: res})
    console.log("table created")
})
    }
)



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
    response.send({response: res})
        console.log("connected to BD")
        client.end()
})
})

// Create User
server.post("/LockerRoom/CreateUser", (req, response)=>{
    const { name,lastname, email, password } = req.body
    client.query
    ("INSERT INTO users (name, lastname, email, password) VALUES ( $1 ,$2, $3, $4) RETURNING *", 
    [name, lastname, email, password]),
    (error, results) =>{
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    }
    
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