import express from "express"
import { register,login,logout, getWriters } from "../controllers/admin.js"

const router = express.Router()

router.post("/register",register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/writers", getWriters)


export default router;