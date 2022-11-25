import { db } from "../db.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export const getContact = (req, res) => {
    const q = "SELECT *FROM contact"

    db.query(q, (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}



export const addContact = (req, res) => {
    //console.log(req.body)
    //if everything is ok then we gonna insert that post into our db
    const q = "INSERT INTO contact(`username`, `email`, `message`) VALUES(?)"

    const values = [
        req.body.username,
        req.body.email,
        req.body.message,
    ]

    db.query(q, [values], (err, data) => {
        //console.log(err)
        if (err) return res.status(500).json(err)

        return res.status(200).json("Thanks for writing us...")
    })
}

export const updateContact = (req, res) => {
    
        const q = "UPDATE contact SET `answered`=? WHERE id = ?"

        db.query(q, [req.body.answered, req.body.id], (err, data) => {
            //console.log(err)
            if (err) return res.status().json(err)
            //console.log(data)

            return res.status(200).json("Updated")
        })
}

