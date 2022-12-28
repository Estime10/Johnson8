
import Router from "express"
import User from "../models/User.mjs"
import bcrypt from "bcryptjs"
import passport from "passport"
import passportConfig from "../config/passport.mjs"
const router = Router();
passportConfig(passport)


// Login page
router.get("/login", ( req, res) =>{
    res.render("login")
})
// Register page
router.get("/register", ( req, res) =>{
    res.render("register")
})
// Register handle
router.post("/register", ( req, res ) =>{
   const {name, email, password, password2 } = req.body
   let errors = []
//  Check required fields
if( !name || !email || !password || !password2 ) {
    errors.push({ message: "Please fill in all fields"})
}
if( password !== password2 ) {
    errors.push({ message: " Passwords do not match"})
}
// Check pass length
if( password.length <6 ) {
    errors.push({ message: "Password should be at least 6 characters"})
}
if( errors.length> 0) {
    res.render("register", {
        errors,
        name,
        email,
        password,
        password2
    })
 } else { 
    // Validation passed
    User.findOne({ email: email })
    .then( user =>{
        if( user ) {
            // User exists
            errors.push({ message: "Email address already registered"})
            res.render("register", {
                errors,
                name,
                email,
                password,
                password2
            })
    } else {
        const newUser = new User({
            name,
            email,
            password
        })
        // Hash password
        bcrypt.genSalt( 10, (err, salt) =>
            bcrypt.hash( newUser.password, salt, (err, hash) => {
            if(err) throw err
        // Set passworrd to hashed
            newUser.password = hash
        // Save user
        newUser.save()
        .then(user => {
            req.flash("success.msg", "You are now registerd and can log in")
            res.redirect("/users/login")
        })
        .catch(err => console.log(err))
        }))
    }
    })
 }
})

// Login handle
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/mainpage",
        failureRedirect: "/login",
        failureFlash: true,
    }) (req, res, next)
  })
// Logout handle
router.get("/logout", (req, res) => {
    req.logout( (err) =>{
        if(err) { 
            console.error(err)
        } else {
            req.flash("success.msg", "You're off the Sneakers Matrix")
            res.redirect("/users/login")
        }
        
    })
    
})

export default router