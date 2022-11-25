import express  from "express";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
import adminAuthRoutes from "./routes/adminAuth.js"
import adminPostRoutes from "./routes/adminPosts.js"
import adminDraftRoutes from "./routes/adminDrafts.js"
import contactUS from "./routes/contacts.js"
import postsRoutes from "./routes/posts.js"
import searchPostsRoutes from "./routes/searchPosts.js"
import usersRoutes from "./routes/users.js"
import commentsRoutes from "./routes/comments.js"
import likesRoutes from "./routes/likes.js"
import multer from "multer"
import dotenv from "dotenv"
import path from "path"

dotenv.config();


const app = express()

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRoutes)
app.use("/api/adminAuth",adminAuthRoutes)
app.use("/api/adminPost",adminPostRoutes)
app.use("/api/adminDraft",adminDraftRoutes)
app.use("/api/contactUS",contactUS)
app.use("/api/posts",postsRoutes)
app.use("/api/search",searchPostsRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/comments",commentsRoutes)
app.use("/api/likes",likesRoutes)

if(process.env.NODE_ENV=='production'){

  app.get('/',(req,res)=>{
      app.use(express.static(path.resolve(__dirname,'admin','build')))
      res.sendFile(path.resolve(__dirname,'admin','build','index.html'))
  })
}

app.listen(process.env.PORT || 8080,()=>{
    console.log("connected")
})