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
import multer from "multer"
import imgModel from "./models/images.mjs"
import fs from "fs"
import path from "path"
const __dirname = path.resolve()

const router = express.Router()




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
// Multer
const storage = multer.diskStorage({
    destination:  (req, file, cb)=> {
      cb(null, 'uploads')
    },
    filename:  (req, file, cb)=> {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
  
  const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const upload = multer({
      storage: storage,
      fileFilter:  (req, file, cb)=> {
          if (allowedFileTypes.includes(file.mimetype)) {
              cb(null, true);
          } else {
              cb(new Error('Seuls les fichiers PNG, JPEG et JPG sont autorisés'));
          }
      }
});  
  
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
// provide the HTML UI
app.get("/mainpage", (req, res) =>{
    imgModel.find({}, (err, items) =>{
        if (err) {
            console.log(err)
            res.status(500).send("An error occured", err)
        }else{ 
            res.render("mainpage", { items, items})
        }
    })
})
// processing the uploaded file
app.post("/mainpage", upload.single("image"), (req, res, next) =>{
    const obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
             item.save();
            res.redirect('/mainpage');
    }
})
})






const PORT = 3000

app.listen(PORT, console.log(`Your Server is running on port ${PORT}`))

