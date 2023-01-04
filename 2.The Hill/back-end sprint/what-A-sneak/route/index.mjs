
import express from "express"
const router = express.Router()


//Welcome page 
router.get("/", ( req, res) =>{
    res.render("login")
})
// Main page
router.get("/dashboard", (req, res) =>{
    res.render("dashboard", {
        // name: req.user.name
    })
})




export default router