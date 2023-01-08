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
import Poeple from "./models/poeple.mjs"
import bcrypt from "bcryptjs"
import ensureAuthenticated from "./config/auth.mjs"
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload"



dotenv.config()
// Conexion to Server
const app = express()
// DB Config
const URI = process.env.ATLAS_URI
// Connect to MongoDB
mongoose.connect(URI, { useNewUrlParser: true})
.then( () => console.log("MongoBD Connected...")) 
.catch ( err => console.log(err))
// Connection to Cloudinary
cloudinary.config({ 
cloud_name: 'dhk6oudef', 
api_key: '325937557113314', 
api_secret: '_hRXtyXyDRYTkRvvtTJ3L94ywnU' 
});
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

// fileupload 
app.use(fileUpload({
  useTempFiles: true,
  limits: { fileSize: 50 * 2024 * 1024 }
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
// Logout
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
// POSTS on the feed
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

if (req.files && req.files.image) {
  const file = req.files.image
  const result = await cloudinary.uploader.upload(file.tempFilePath)
    const postingMessage = new Post({
        content: req.body.content,
        name:req.user.name,
        avatar: result.secure_url,
      cloudinary_id: result.public_id,
    })
    if (req.user) {
      postingMessage.userId = req.user._id;
      try {
        await postingMessage.save()
        
        res.redirect("dashbord")
      } catch (err) {
        console.log(err)
        res.redirect("/")
      }
    }
  } else {
    res.redirect("register")
  }
})
  // Post file //still need to find a way to fetch it to the user/add on the user_name
 
  app.post("/", async ( req, res ) =>{

    const file = req.files.image 
    try {
const result = await cloudinary.uploader.upload(file.tempFilePath)
    let poeple = new Poeple({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
      })
      await poeple.save()
      res.json(poeple)
    } catch (err) {
        console.log(err)
      }
    })
// // app.get("/login/add avatar") to put on the post bellow/add it to the loginEJS
// app.get("/", async ( req, res) =>{
//   try{
//     let poeple = await Poeple.find()
//     res.json(poeple)
//   } catch (err) {
//     console.log(err)
//   }
// })

    
    
    
   
  
  
const PORT = 3001

app.listen(PORT, console.log(`Server started on port 3001`))