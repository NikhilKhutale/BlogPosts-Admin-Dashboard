import { db } from "../db.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export const getDrafts = (req, res) => {
    const q = "SELECT *FROM draft"

    db.query(q, (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}



export const addDraft = (req, res) => {
    //console.log(req.body)


    const q = "INSERT INTO draft(`title`, `descr`, `img`, `cat`, `date`,`tags`) VALUES(?)"

    const values = [
        req.body.title,
        req.body.descr,
        req.body.img,
        req.body.cat,
        req.body.date,
        req.body.tags,
    ]

    db.query(q, [values], (err, data) => {
        //console.log(err)
        if (err) return res.status(500).json(err)

        return res.status(200).json("Draft has been created")
    })
}

export const deleteDraft = (req, res) => {

    const postId = req.params.id
    const q = "DELETE FROM draft WHERE id = ?"

    db.query(q, [postId], (err, data) => {
        if (err) return res.status().json(err)
        //console.log("deleted")

        return res.status(200).json("Post has been deleted")
    })

}

