import pg from "pg";
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
  CREATE TABLE usersLists (
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
  client.end();
});

client.connect()
.then(() => console.log("hello there"));
