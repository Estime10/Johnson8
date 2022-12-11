import client from "../../database/client.mjs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { promisify } from "util"



const sign = promisify(jwt.sign)
const loginUser = async (req, res) =>{
    const { email, password } = req.body

    const user = await client.query(
        ` SELECT email, password id FROM users WHERE  email = $1`, [email]
        )
        if ( user.rows.length === 0 ) {
            return res.status(400).send({
                error: "This user does not exist"
            })
        }
    const match = await bcrypt.compare( password, user.rows[0].password )

        if  ( !match ) {
            return res.status(403).send({
                error: " Please Enter a valid password "
            })
        }
    
    const profile = await client.query(
        ` SELECT id FROM profile WHERE user_id = $1`, [user.rows[0].id]
        )
    try {
        const token = await sign (
            { 
                profile_id: profile.rows[0].id},
                process.env.PRIVATE_KEY_AUTH,
            {
                algorithm: "HS512",
                expireIn: "1h",
            })
        const toks = 
        {
            tokenKey: token
        }
        res.json(toks)
    } catch ( error ) {
        console.log(` The login failed: ${error}`)
        return res.status(500).send({ error: " Cannot gerate token "})
    }
}

export default loginUser