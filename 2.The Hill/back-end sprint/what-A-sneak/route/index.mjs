import express from "express"
import Router from "express"
import authenticate from "../config/auth.mjs"
const router = Router()

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