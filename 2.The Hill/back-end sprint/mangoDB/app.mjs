import express from "express"
import expressEjsLayouts from "express-ejs-layouts"
import mongoose from "mongoose"
import flash from "connect-flash"
import session from "express-session"
import dotenv from "dotenv"
import passport from "passport"
import passportConfig from './config/passport.mjs'
import Post from "./models/posts.mjs"
import User from "./models/user.mjs"
import bcrypt from "bcryptjs"
import ensureAuthenticated from "./config/auth.mjs"
import { render } from "ejs"
dotenv.config()
// Conexion to Server
const app = express()
// DB Config
const URI = process.env.ATLAS_URI
// Connect to MongoDB
mongoose.connect(URI, { useNewUrlParser: true})
.then( () => console.log("MongoBD Connected...")) 
.catch ( err => console.log(err))
// EJS
app.use(expressEjsLayouts)
// EJS css file
app.use("/static", express.static("public"))
app.set("views", "./routes/views")
app.set("view engine", "ejs")
// BodyParser
app.use(express.urlencoded({ extended: false}))
app.use(express.urlencoded({ extended: true}))
// Express session mdlware
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

// Passport mdlware
passportConfig(passport);
app.use(passport.initialize())
app.use(passport.session())
// Connect flash mdlware
app.use(flash())
// Global Vars not working 
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
next();
})


// Home Page
app.get("/", (req, res)=>{
    res.render("welcome")
})
// Login Page
app.get("/login", ( req, res ) =>{
    res.render("login")
})
// Register Page
app.get("/register", ( req, res ) =>{
    res.render("register")
})
// Register Handle
app.post("/register", ( req, res) =>{
    console.log(req.body)
    const { name, email, password, password2 } = req.body
    let errors = []
    // Check required fields
    if ( !name || !email || !password || !password2 ){
       errors.push({ message: "Please fill in all fields"}) 
    }
    // Check passwords match
    if ( password !== password2 ){
        errors.push({ message: "Password do not match"})
    }
    // Check password lenght
    if ( password.length <6 ){
        errors.push({ message: "Password should contain min 6 characters"})
    }
    if ( errors.length > 0 ){
        res.render("register", {
            errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        })
    }
    else { 
    // Validation passed
    User.findOne({ email: email })
        .then(user => {
            if (user){
            // User exists
            errors.push({ message: "Email already registered"})
            res.render("register", {
                errors,
                name: name,
                email: email,
                password: password,
                password2: password2
    })
        }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
            })
    // Hash Password
    bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt,(err, hash)=>{
            if (err) throw err
    // set hashed password
    newUser.password = hash
    // save user
    newUser.save()
            .then( user => {
            req.flash("success_msg", "You are now registered")
            res.redirect("/login")
            })
            .catch( err => console.log(err))}))
            }
        })
    }
})

// Login Handle
// Login
app.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashbord",
        failureRedirect: "/login",
        failureFlash: true,
    }) (req, res, next)
  })
// Loggin out to do
app.get('/logout', (req, res) => {
    // Use the logout function provided by passport, passing in a callback function
    req.logout(function(err) {
      if (err) {
        // An error occurred during the logout process
        console.error(err);
      }
      // Redirect the user to the login page
      res.redirect('/login');
    });
  });
// POSTS
app.get("/dashbord", (req,res) =>{
    Post.find({}, (err, postingMessage) => {
        if (err) {
            // An error occurred
            console.error(err);
            return res.sendStatus(500);
          }
    res.render("dashbord.ejs", { user: req.user, postingMessage: postingMessage})
  })
})
app.post("/dashbord", async (req, res) => {

    const postingMessage = new Post({
        content: req.body.content,
        name:req.user.name
    })
    if (req.user) {
      postingMessage.userId = req.user._id;
      try {
        await postingMessage.save()
        res.render("dashbord", { user: req.user, postingMessage: postingMessage });
        res.redirect("dashbord")
      } catch (err) {
        console.log(err)
        res.redirect("/")
      }
    }
  })
  
const PORT = 3000

app.listen(PORT, console.log(`Server started on port 3000`))