import pgkg from "pg"
import * as dotenv from "dotenv"

dotenv.config()

const client = new pgkg.Client({
    user: "postgres",
    host: 'localhost',
    database: 'lrapp',
    password: process.env.LRPASSWORD,
    port: 5432,
})

export default client