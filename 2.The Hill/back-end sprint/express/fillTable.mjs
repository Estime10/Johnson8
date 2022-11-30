// import { users } from "./users.mjs";
// import pg from "pg";
// import * as dotenv from 'dotenv'
// dotenv.config()

// const client = new pg.Client({
//   user: 'postgres',
//   host: 'localhost',
//   database:"first_db",
//   password: `${process.env.MYSQL_PASSWORD}`,
//   port: 5432,
// })

// client
//   .connect()
//   .then(() =>
//     users.forEach((user) => {
//       let { id, firstName, lastName, email, ip } = user;
//       client.query("insert into usersLists values ($1, $2, $3, $4, $5)", [
//         id,
//         firstName,
//         lastName,
//         email,
//         ip,
//       ]);
//     })
//   )

//   .then(() => client.query("select DISTINCT * from usersLists Order by id"))
//   .then((results) => console.table(results.rows))
//   .finally(() => client.end());







