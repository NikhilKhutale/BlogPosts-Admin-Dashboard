import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getPosts = (req, res) => {
    const pageNo = req.query.page
    //console.log(pageNo)
    const cat = req.query.cat
    
    if (cat) {
        const offLimit = (pageNo * 10)-10
        //console.log(offLimit)
        const limit = 10
        const q = "SELECT * FROM posts WHERE cat = ? ORDER BY date DESC LIMIT ?,?"

        db.query(q, [req.query.cat, offLimit, limit], (err, data) => {
            if (err) return res.json(err)


            
            return res.status(200).json(data)
        })
    } else {
        const offLimit = (pageNo * 10)-10
        const limit = 10
        const q = "SELECT * FROM posts ORDER BY date DESC LIMIT ?, ?"

        db.query(q, [offLimit, limit], (err, data) => {
            if (err) return res.json(err)

            
            return res.status(200).json(data)
        })
    }
}

export const getPost = (req, res) => {
    //console.log("requested")
    const q = "SELECT * FROM posts WHERE id = ?"

    db.query(q, [req.params.id], (err, data) => {
        //console.log(err)
        if (err) return res.status(500).json(err)

        //console.log(data)
        return res.status(200).json(data[0])
    })
}
