import { db } from "../db.js"

export const getLikes = (req,res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?"

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err)
        //console.log(data)
        return res.status(200).json(data.map(like => like.userId))
    })
}


export const addLike = (req,res) => {
    const q = "INSERT INTO likes (`userId`,`postId`) VALUES(?)"

    const values = [
        req.body.userid,
        req.body.postid
    ]

    //console.log(values)

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        //console.log("liked")
        return res.status(200).json("Post has been liked!")
    })
}


export const deleteLike = (req,res) => {
    const q = "DELETE FROM likes WHERE `userId`=? AND `postId` = ?"

    const values = [
        req.body.userid,
        req.body.postid
    ]

    //console.log(req.body)

    db.query(q,[req.body.userid,req.body.postid],(err,data)=>{
        if(err) return res.json(err)
        //console.log("disliked")
        return res.status(200).json("Like has been deleted!")
    })
}