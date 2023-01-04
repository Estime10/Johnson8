
import Client from "../models/Client.mjs"
import bcrypt from "bcryptjs"
import passport from "passport"
import passportConfig from "../config/passport.mjs"
import express from "express"
import multer from "multer"
const router = express.Router()
passportConfig(passport)


// Upload image
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename:function(req, file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})
const upload = multer({
    storage: storage,
}).single('image')



// Login page
router.get("/login", (req, res, next) => {
    res.render("login")
})
// Register page
router.get("/register", (req, res) => {
    res.render("register")
})
// Main page
router.get("/dashboard", (req, res) =>{
    res.render("dashboard", {
        // name: req.user.name
    })
})
// Register handle
router.post("/register", upload, (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []
    //  Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ message: "Please fill in all fields" })
    }
    if (password !== password2) {
        errors.push({ message: " Passwords do not match" })
    }
    // Check pass length
    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters" })
    }
    
    // Validation passed
    Client.findOne({ email: email })
        .then(client => {
            if (client) {
    // Customers exists
    errors.push({ message: "Email address already registered" })
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
})
    }else {
    const user = new Client({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.file.filename,
})
    // Hash password
    bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash( user.password, salt, (err, hash) => {
        if (err) throw err
    // Set passworrd to hashed
     user.password = hash
    // Save client
     user.save()
        .then( user => {
        req.flash("success.msg", "You are now registerd and can log in")
        res.redirect("login")
})
        .catch(err => console.log(err))
}))
}
})
}
)

// Login handle
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/login",
        failureRedirect: "/dashboard",
        failureFlash: true,
    })(req, res, next)
})
// Logout handle
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err)
        }else {
            req.flash("success.msg", "You're off the Sneakers Matrix")
            res.redirect("login")
}
})
})


export default router


