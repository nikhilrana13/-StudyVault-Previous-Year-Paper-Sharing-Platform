import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
export const isAuthenticated = async(req,res,next)=>{
    try {
        const Authheader = req.headers.authorization;
        //  console.log("Authheader",Authheader);
        if(!Authheader || !Authheader.startsWith("Bearer ")){
            return res.status(401).json({message:"Unauthorized no token provided"});
        }
        const token = Authheader.split(" ")[1];


        if(!token || token === "null" ){
            return res.status(401).json({message:"Unauthorized please login"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log("req.user",decoded);
        req.user = decoded.id;
        // for admin only
        const user = await UserModel.findById(decoded.id).select("-password");
        req.userData = user;
        next();
    } catch (error) {
        console.log("failed to authenticate",error);
        return res.status(401).json({message:"Something went wrong"});
    }
}
