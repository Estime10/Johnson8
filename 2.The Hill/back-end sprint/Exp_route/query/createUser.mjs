import client from "../database/client.mjs"

const createUseer = (req, res) => {
    const { 
        
        firstname,
        lastname, 
        email, 
        ip 
    } = req.body

    client.query(
        "INSERT INTO users ( firstname, lastname, email,ip ) VALUE ( $1, $2, $3, $4) RETURNING *"
        [ firstname, lastname, email, ip],
        (error, results) => {
            if(error) {
                throw error
            }
            res.status(201).send(`User added with ID: ${res.row[0].id}`)
        }
    )
}

export default createUseer