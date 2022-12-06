import client from "../db/client.mjs"

const createUser = (request, response) => {
    const { email , firstname, lastname, nickname, password  } = request.body;
  
    client.query(
      "INSERT INTO members (email , firstname, lastname, nickname, password ) VALUES ( $1, $2, $3, $4, $5) RETURNING *",
      [email  , firstname, lastname, nickname, password ],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    );
  };

export default createUser;