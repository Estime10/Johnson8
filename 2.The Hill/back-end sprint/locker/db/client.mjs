import pkg from "pg"
import * as dotenv from "dotenv"

dotenv.config()

const { Client } = pkg

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "Members",
    password: process.env.MYSQL_PASSWORD,
    port: 5432,
})

export default client