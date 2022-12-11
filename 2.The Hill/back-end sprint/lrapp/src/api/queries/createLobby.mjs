import client from "../../database/client.mjs"
import jwt from 'jsonwebtoken'
import { promisify } from 'util'




const createLobby = async (req, res) => {
    const { title } = req.body
    const profile_id = req.userId
    client.query(
        "INSERT INTO lobby ( title, profile_id) VALUES ($1, $2 ) RETURNING *",
        [title, profile_id],
        (error, results) => {
          if (error) {
            throw error;
          }
          client.query(
            "INSERT INTO user_lobby ( user_id, lobby_id) VALUES ($1, $2 ) RETURNING *",
            [profile_id, results.rows[0].id],
            (error, results) => {
              if (error) {
                throw error;
              }
              console.log(results.rows);
            }
          );
          response
            .status(201)
            .send(`Lobby added with ID: ${results.rows[0].id} and title ${title}`)
        }
      )
    }



export default createLobby;