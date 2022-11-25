import express  from "express";
import {getPost, getPosts } from "../controllers/post.js";

const router = express.Router()

//get all posts
router.get("/", getPosts)

//get single post we gonna get the post by their id
router.get("/:id",getPost)



export default router;