import express from "express"
import { getUsers,createUser, getOneUser, deleteUser, updateUser } from "../controlers/user.js"


const router = express.Router()
// all the router are inside controlers.js
router.get('/users',getUsers )
router.post('/users',createUser )
router.get('/users/:id',getOneUser )
router.delete('/users/:id',deleteUser )
router.put('/users/:id',updateUser )

export default router