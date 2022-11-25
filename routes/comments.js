import express from "express";
import { addComment, getAllComments, getComments } from "../controllers/comment.js";


const router = express.Router()

router.post("/addComment",addComment)

router.get("/getComments/:id",getComments)

router.get("/getComments/",getAllComments)

export default router;