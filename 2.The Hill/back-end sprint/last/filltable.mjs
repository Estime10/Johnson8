import { users } from "./users.mjs";
import * as dotenv from "dotenv";
dotenv.config()
import pg from "pg";

const client = new pg.Client({
    user:'postgres',
    host:'localhost',
    database: "users",
    password: `${process.env.MYSQL_PASS}`,
    port: 5432,
})

client
.connect()
.then(() => 
users.forEach((user) => {
    let { id, firstName, lastName, email,ip } = user;
    client.query("insert into userLists values ($1, $2, $3, $4, $5)", 
    [id, firstName, lastName, email, ip]);
}))

.then(() => client.query("select DISTINCT * from userLists Order by id"))
.then((results) => console.table(results.rows))
.finally(() => client.end());
