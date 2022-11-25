import { db } from "../db.js"
import bcrypt from 'bcryptjs';


export const updateProfile = (req,res) => {
    //console.log(req.body)
    const q = "SELECT * FROM users WHERE username = ? OR email = ?"

    db.query(q,[req.body.username,req.body.email],(err,data) => {
        if(err) return res.json(err)

        if(data.length > 1) return res.status(409).json("username or email already used")

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "UPDATE users SET `username`=?, `email`=?, `password`=?, `img`=? WHERE `email`=?"

        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.imgUrl
        ]

        db.query(q,[...values,req.body.email],(err,data)=>{
            if (err) return res.json(err)

            const q = "SELECT * FROM users WHERE email = ?"
                db.query(q, [req.body.email], (err, data) => {
                    if (err) return res.json(err)
                    const { password, ...other } = data[0]
                    return res.status(200).json(other)
            })
        })
    })
}
