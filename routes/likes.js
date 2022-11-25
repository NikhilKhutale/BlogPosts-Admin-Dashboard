import express from "express"
import { getLikes, addLike, deleteLike } from "../controllers/like.js";


const router = express.Router()

router.get("/:id", getLikes)
router.post("/addlike", addLike)
router.delete("/deletelike", deleteLike)

export default router;