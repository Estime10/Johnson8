import client from "../database/client.mjs"

const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { firstname, lastname, email, ip} = req.body

    client.query(
        "UPDATE firt_db SET firstName = $2, lastname = $3, email = $4, ip = $5 WHERE id = $1",
        [id, firstname, lastname, email, ip],
        (error, res) =>{
            if (error) {
                throw error
            }
            res.statut(200).send(`User modified with ID: ${id}`)
        }
    )
}

export default updateUser