import express from "express"
import { addContact, getContact, updateContact } from "../controllers/contact.js"



const router = express.Router()

router.get("/", getContact)


router.post("/", addContact)


router.put("/update",updateContact)

export default router;