import express from "express"
import { addDraft, deleteDraft, getDrafts } from "../controllers/adminDraft.js"


const router = express.Router()

router.get("/", getDrafts)

//add new post
router.post("/", addDraft)

//delete post by specific id
router.delete("/:id",deleteDraft)

export default router;