import pg from "pg";
import express from "express";
import { users } from "./users.mjs";
import bodyParser from "body-parser";
// import { v4 as uuid4 } from "uuid"
import * as dotenv from 'dotenv'
dotenv.config()

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database:"first_db",
  password: `${process.env.MYSQL_PASSWORD}`,
  port: 5432,
})

const app = express()
app.use = (bodyParser.json());

app.get("/users", (req, res) =>{
    res.json(users)
    
})
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id)
    const note = users.find(note => note.id === id)
    res.json(note)
  })

app.post("/users", (req, res) => {
    const { firstName, lastName, email, ip } = req.body;
  console.log( firstName, lastName, email, ip)

    users.push({
        
        firstName: firstName,
        lastName: lastName,
        email: email,
        ip: ip
    });
  
    res.send(users);
  });

  app.patch("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(user =>
        user.id === userId
    );
    const { firstName, lastName, email, ip } = req.body;
  
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.ip = ip;
  
    res.send(users);
  }); 







// 
  const queryTable = `
  CREATE TABLE list (
      "id" int,
      "firstName" varchar not null,
      "lastName" varchar  not null,
      "email" varchar not null,
      "ip" varchar 
  );
  `;

client.query(queryTable, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Table is successfully created");
//   client.end();
});



client
  .connect()
  
  .then(() =>
    users.forEach((user) => {
      let { id, firstName, lastName, email, ip } = user;
      client.query("insert into userLists values ($1, $2, $3, $4, $5)", [
        id,
        firstName,
        lastName,
        email,
        ip,
      ])

    .then(() => client.query("select DISTINCT * from usersLists Order by id"))
    .then((results) => console.table(results.rows))
    .finally(() => client.end());
    })
  )

  

app.listen(3000, () =>{
    console.log("Server running on port 3000")
})