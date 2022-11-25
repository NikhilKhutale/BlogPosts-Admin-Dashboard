import { db } from "../db.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const q = "SELECT *FROM posts"

    db.query(q, (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}


export const addPost = (req, res) => {

    const q = "INSERT INTO posts(`title`, `descr`, `img`, `cat`, `date`,`tags`, `thumbnail`) VALUES(?)"

    const values = [
        req.body.title,
        req.body.descr,
        req.body.img,
        req.body.cat,
        req.body.date,
        req.body.tags,
        req.body.thumbnail,
    ]

    db.query(q, [values], (err, data) => {
        //console.log(err)
        if (err) return res.status(500).json(err)

        return res.status(200).json("post has been created")
    })

}


export const deletePost = (req, res) => {


    const postId = req.params.id
    const q = "DELETE FROM posts WHERE id = ?"

    db.query(q, [postId], (err, data) => {
        if (err) return res.status().json(err)

        return res.status(200).json("Post has been deleted")
    })

}

export const updatePost = (req, res) => {
    //console.log(req.body)
    const postId = req.params.id
    const q = "UPDATE posts SET `title`=?, `descr`=?, `img`=?, `cat`=?, `tags`=?, `thumbnail`=? WHERE `id`=?"

    const values = [
        req.body.title,
        req.body.descr,
        req.body.img,
        req.body.cat,
        req.body.tags,
        req.body.thumbnail,
    ]

    db.query(q, [...values, postId], (err, data) => {
        if (err) return res.status().json(err)

        return res.status(200).json("post has been updated")
    })

}
