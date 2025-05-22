import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import cookieParser from "cookie-parser"

export const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.chatter

        if (!token)
            return res.status(401).json({message: "Unauthorized: No token found"})
        
        const decoded = jwt.verify(token, process.env.hashkey)

        if(!decoded)
            return  res.status(401).json({message: "Unauthorized: Invalid token"})

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        req.user = user

        next()
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal error"})
    }
}