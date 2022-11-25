import express from "express"
import { getPosts, addPost, deletePost, updatePost } from "../controllers/adminPost.js";

const router = express.Router()

router.get("/", getPosts)

//add new post
router.post("/", addPost)

//delete post by specific id
router.delete("/:id",deletePost)

//update post by specific id
router.put("/:id", updatePost)

export default router;