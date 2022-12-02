import pg from "pg";
import express from "express";
import { users } from "./users.mjs";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'
dotenv.config()

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database:"first_db",
  password: `${process.env.MYSQL_PASSWORD}`,
  port: 5432,
})

  const queryTable = `
  CREATE TABLE  if not exists first_db (
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
      client.query("insert into first_db values ($1, $2, $3, $4, $5)", [
        id,
        firstName,
        lastName,
        email,
        ip,
      ])

    .then(() => client.query("select DISTINCT * from first_db Order by id"))
    .then((results) => console.table(results.rows))
    .finally(() => client.end());
    })
  )

  const app = express()
  app.use (bodyParser.json());
  
  app.get("/users", (req, res) =>{
      res.json(users)
      
  })
  
  app.get("/users/:id", (req, res) => {
      const id = Number(req.params.id)
      const note = users.find(note => note.id === id)
      res.json(note)
    })

  
  app.post("/users", (req, res) => {
      const { id,firstName, lastName, email, ip } = req.body;
    
  
      users.push({
          id: id,
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


app.listen(3000, () =>{
    console.log("Server running on port 3000")
})