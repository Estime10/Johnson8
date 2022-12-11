import express from "express"
import * as dotenv from "dotenv"
import DBconnection from "./src/database/DBconnection.mjs"
import loginUser from "./src/api/auth/login.mjs"
import registerUser from "./src/api/auth/register.mjs"
import createLobby from "./src/api/queries/createLobby.mjs"
import lobbies from "./src/api/queries/allLobbies.mjs"




dotenv.config()

const server = express()
const PORT = 3001

// connexion to DB
DBconnection()

server.use(express.json())

// the browser json
server.get("/", (req, res) =>{
    res.send({info: "tryout"})
})


// POST register
server.post("/api/register/", registerUser)
// POST login
server.post("/api/login/", loginUser)
// GET lobbies
server.get("api/lobbies/", lobbies)
// POST create lobby
server.post("/api/lobby/", createLobby)







// connexion to browser
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
