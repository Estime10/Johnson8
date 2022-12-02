import client from "./client.mjs"

const dbConnect = () => {
    client.connect((err) => {
        if(err) {
            console.error("connection error", err.stack)
        }else {
            console.log("Successfully connected")
        }
    })
}

export default dbConnect