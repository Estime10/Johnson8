import express from "express"
import mongoose from "mongoose"
import expressEjsLayouts from "express-ejs-layouts"
import indexRouter from "./route/index.mjs"
import usersRouter from "./route/users.mjs"
import flash from "connect-flash"
import session from "express-session"
import dotenv from "dotenv"

dotenv.config()
const app = express()
// DB Congig
const URI = process.env.ATLAS_URI
mongoose.connect(URI, { useNewUrlParser: true})
.then( () => console.log("MongoDataBase is connected successfully!")) 
.catch ( err => console.log(err))

// EJS
app.use(expressEjsLayouts)
app.set('view engine', 'ejs');
// Body-Parser
app.use(express.urlencoded({extended: false}))
// Express Session 
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}))
// Connect-flash
app.use(flash())
// Global Variables
app.use(( req, res, next) =>{
    res.locals.success_msg = req.flash("success.msg")
    res.locals.error_msg = req.flash("error.msg")
    res.locals.error = req.flash('error');
    next()
})
// Route
app.use("/", indexRouter )
app.use("/users", usersRouter )


const PORT = 3000

app.listen(PORT, console.log(`Your Server is running on port ${PORT}`))

