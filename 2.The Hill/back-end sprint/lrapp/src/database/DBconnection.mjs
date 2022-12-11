import client from "./client.mjs"

const DBconnection = async () =>{
    try {
        await client.connect()
        console.log("connected to DB")
    } catch (err) {
        console.log(`conncexion failed ${err}`)
    }
}

export default DBconnection