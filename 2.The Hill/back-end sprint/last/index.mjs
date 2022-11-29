import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config()

const client = new pg.Client({
    user:'postgres',
    host:'localhost',
    database: "users",
    password: `${process.env.MYSQL_PASS}`,
    port: 5432,
})

const queryTable = `
CREATE TABLE userLists ( 
    "id" int,
    "firstName" varchar not null,
    "lastName" varchar not null,
    "email" varchar not null,
    "ip" varchar
);
`;

client.query(queryTable, (err, res) =>{
    if(err) {
        console.error(err);
        return;
    }
    console.log("Table has been successfully created");
    client.end();
});

client.connect()
.then(()=> console.log("keep on grinding "));
