import client from "../database/client.mjs"

const deleteUser = (req, res) =>{
    const id = parseInt(req.params.id)
    client.query("DELETE FROM first_db WHERE id = $1", [id], (error, res) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

export default deleteUser