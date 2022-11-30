import express from "express"
import bodyParser from "body-parser"
import userRouter from "./routes/user.js"

const app = express()

app.use(bodyParser.json())

app.use('/api', userRouter)


app.listen(3000, () =>{
    console.log('Hey server running on localhost:3000');
})