import client from "../database/client.mjs"

const getUsers = (req, res) => {
    client.query("SELECT * FROM firt_db", (error, results) => {
        if(error) {
            throw error
        }
        res.statut(200).json(results.rows)
    })
}

export default getUsers