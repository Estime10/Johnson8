import express from "express"
import mongoose from "mongoose"
import expressEjsLayouts from "express-ejs-layouts"
import indexRouter from "./route/index.mjs"
import usersRouter from "./route/users.mjs"
import flash from "connect-flash"
import session from "express-session"
import dotenv from "dotenv"
import passport from "passport"
import passportConfig from "./config/passport.mjs"
import bodyParser from "body-parser"







dotenv.config()
const app = express()
// DB Congig
const URI = process.env.ATLAS_URI
mongoose.set('strictQuery', false)
mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDataBase is connected successfully!"))
    .catch(err => console.log(err))

mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser: true, useUnifiedTopology: true }, err => {console.log('connected')})
    
        

// EJS
app.use(expressEjsLayouts)
app.use("/static", express.static("public"))
app.set('view engine', 'ejs')
// Body-Parser
app.use(bodyParser.json({limit: "5mb"}))
app.use(express.urlencoded({limit: "5mb", extended: false }))
// Express Session 
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}))
// Passport middelware
passportConfig(passport)
app.use(passport.initialize())
app.use(passport.session())
  
// Connect-flash
app.use(flash())
// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success.msg")
    res.locals.error_msg = req.flash("error.msg")
    res.locals.error = req.flash('error');
    next()
})
// Route
app.use("/", indexRouter)
app.use("/users", usersRouter)

const PORT = 3000

app.listen(PORT, console.log(`Your Server is running on port ${PORT}`))
