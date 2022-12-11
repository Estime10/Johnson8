import client from "../../database/client.mjs"

const lobbies = async (req, res) =>{
    try {
        const lobs = await client.query(" SELECT * FROM lobby")
        res.send(lobs.rows)
    } catch ( err ) {
        console.log(` Problem accessing the lobbies: ${ err }`)
    }
}

export default lobbies