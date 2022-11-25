import { db } from "../db.js"

export const searchPosts = (req, res) => {
    //console.log(req.query)

    const pageNo = req.query.page
    //console.log(pageNo)
    const queryName = req.query.q
    //console.log(queryName)

    const offLimit = (pageNo * 10) - 10
    //console.log(offLimit)
    const limit = 10
    const q = "SELECT * FROM posts WHERE MATCH(`title`, `descr`, `tags`) AGAINST( ? IN BOOLEAN MODE) ORDER BY date DESC LIMIT ?,?"

    db.query(q, [queryName, offLimit, limit], (err, data) => {
        //console.log((err))
        if (err) return res.json(err)

        //console.log(data)
        
        return res.status(200).json(data)
    })
}

export const popularPosts = (req,res) => {
    const q = "SELECT * FROM posts ORDER BY RAND() LIMIT 4"

    db.query(q,(err,data) => {
        //console.log(err)
        if(err) return res.json(err)

        return res.status(200).json(data)
    })
}

