import { db } from "../db.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import { LocalStorage } from 'node-localstorage'

export const register = (req, res) => {
    

    const q = "SELECT * FROM users WHERE username =? OR email = ?"
    db.query(q, [req.body.username, req.body.email], (err, data) => {
        if (err) return res.json(err)
        
        if (data.length) return res.status(409).json("User already existed!")

         
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        
        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"

        const values = [
            req.body.username,
            req.body.email,
            hash
        ]
        db.query(q, [values], (err, data) => {
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

export const login = (req, res) => {
    
    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("User not registered")

        
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPasswordCorrect) return res.status(404).json("Wrong username or password")

        

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRETE)
        
        const { password, ...other } = data[0]

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json("User has been logged out.")
}


export const isSubscribed = (req, res) => {
    

    if (req.cookies.access_token) {
        const token = req.cookies.access_token
        jwt.verify(token, process.env.JWT_SECRETE, (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid")

            const useremail = req.body.email
            const q = "UPDATE users SET isSubscribed = ? WHERE email = ?"

            db.query(q, [req.body.subscribe, useremail], (err, data) => {
                if (err) return res.status(500).json(err)


                const q = "SELECT * FROM users WHERE email = ?"
                db.query(q, [req.body.email], (err, data) => {
                    if (err) return res.json(err)
                    const { password, ...other } = data[0]
                    return res.status(200).json(other)
                })
            })
        })
    } else { return res.status(401).json("Not authenticated") }


}


export const subscribedCat = (req, res) => {
    


    if (req.cookies.access_token) {
        const token = req.cookies.access_token
        jwt.verify(token, process.env.JWT_SECRETE, (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid")

            const useremail = req.body.email
            //console.log(req.body.checkbox)
            const q = "UPDATE users SET `subscribedCat = ?` WHERE email = ?"


            db.query(q, [[req.body.checkbox], useremail], (err, data) => {
                //console.log(err)
                if (err) return res.status(500).json("chuklay")


                const q = "SELECT * FROM users WHERE email = ?"
                db.query(q, [req.body.email], (err, data) => {
                    if (err) return res.json(err)
                    const { password, ...other } = data[0]
                    return res.status(200).json(other)
                })
            })
        })
    } else { return res.status(401).json("Not authenticated") }


}

export const subscribedCategory = (req, res) => {
    //lets check user first

    //console.log(req.body)

    const val = req.body

    const {email, ...others} = val

    //console.log(email)
    //console.log(others)

    const areFalse = Object.values(others).every(
        value => value === false
      );

    if(areFalse){
        return res.status(409).json("Atleast one Category must be selected")
    }

    if (req.cookies.access_token) {
        const token = req.cookies.access_token
        jwt.verify(token, process.env.JWT_SECRETE, (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid")

            const useremail = req.body.email
            //console.log(req.body.checkbox)
            const q = "UPDATE users SET `lifestyle` = ?, `fashion` = ?, `technology` = ?, `travel` = ?, `health` = ? WHERE `email` = ?"


            const values = [
                req.body.lifestyle,
                req.body.fashion,
                req.body.technology,
                req.body.travel,
                req.body.health,
            ]

            db.query(q, [...values, useremail], (err, data) => {
                //console.log(err)
                if (err) return res.status(500).json("chuklay")


                const q = "SELECT * FROM users WHERE email = ?"
                db.query(q, [req.body.email], (err, data) => {
                    if (err) return res.json(err)
                    const { password, ...other } = data[0]
                    return res.status(200).json(other)
                })
            })
        })
    } else { return res.status(401).json("Not authenticated") }
}

