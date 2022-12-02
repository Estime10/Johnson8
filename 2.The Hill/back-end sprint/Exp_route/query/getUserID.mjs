import client from "../database/client.mjs"

const getUserById = (req, res) => {
    const id = parseInt(req, res)

    client.query("SELECT * FROM first_db WHERE id = $1", [id],( error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

export default getUserById