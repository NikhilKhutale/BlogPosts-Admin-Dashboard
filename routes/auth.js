import express from "express"
import { isSubscribed, login, logout, register, subscribedCat, subscribedCategory } from "../controllers/auth.js"

const router = express.Router()

router.post("/register",register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/subscribe", isSubscribed)
router.post("/subscribedCategory", subscribedCategory)

export default router;