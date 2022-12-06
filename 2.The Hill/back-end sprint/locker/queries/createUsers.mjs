import client from "../db/client.mjs"

const createUser = (request, response) => {
    const { firstname, secondname, email, password } = request.body;
  
    client.query(
      "INSERT INTO users (firstName, secondName, email, password) VALUES ( $1, $2, $3, $4) RETURNING *",
      [firstname, secondname, email, password],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    );
  };

export default createUser;