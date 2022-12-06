import client from "./db/client.mjs"

const getUsers = (req, res) =>{
    client.query("SELECT * FROM members", (error, results) =>{
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

export default getUsers