import express  from "express";
import { popularPosts, searchPosts } from "../controllers/searchPost.js";


const router = express.Router()




router.get("/",searchPosts)

router.get("/popular",popularPosts)


export default router;