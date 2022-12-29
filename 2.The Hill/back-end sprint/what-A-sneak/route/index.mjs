import authenticate from "../config/auth.mjs"
import express from "express"
const router = express.Router()


//Welcome page 
router.get("/", ( req, res) =>{
    res.render("Welcome")
})
// Main page
router.get("/mainpage", authenticate, (req, res) =>{
    res.render("mainpage", {
        name: req.user.name
    })
})




export default router