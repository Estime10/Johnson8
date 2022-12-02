import pkg from "pg"
import * as dotenv from "dotenv"

dotenv.config()

const { Client } = pkg

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database:"first_db",
    password: process.env.PASSWORD,
    port: 5432,

})

export default client