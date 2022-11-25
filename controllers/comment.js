import { db } from "../db.js"


export const addComment = (req,res)=>{
    const q = "INSERT INTO comments(`comment`,`postid`,`username`) VALUES(?)"

    const values = [
        req.body.commentBody,
        req.body.id,
        req.body.username
    ]

    //console.log(values)

    db.query(q,[values],(err,data)=>{
        //console.log(err)
        if(err) return res.status(501).json(err)
        

        return res.status(200).json("commented")
    })
}

export const getComments = (req,res) => {
    const q = "SELECT * FROM comments WHERE postid = ?"

    //console.log(req.params.id)
    db.query(q, [req.params.id], (err, data) => {
        //console.log(err)
        if (err) return res.status(500).json(err)
        //console.log(data)
        return res.status(200).json(data)
    })
}

export const getAllComments = (req,res) => {
    const q = "SELECT * FROM comments"

    db.query(q,(err, data) => {
        //console.log(err)
        if (err) return res.status(500).json(err)
        //console.log(data)
        return res.status(200).json(data)
    })
}