import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



export const SignUp = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        // console.log("req.body",req.body);

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"email already exists"});
        }
        // hash password
        const hashpassword = await bcrypt.hash(password,10);
        const user = await UserModel.create({
            name,
            email,
            password:hashpassword
        })
        return res.status(200).json({message:"Signup successfullly",user});
    } catch (error) {
        console.log("failed to signup",error);
        return res.status(500).json({message:"failed to signup"});
    }
}
export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"});
        }

        const comparepassword = await bcrypt.compare(password,user.password);
        if(!comparepassword){
            return res.status(400).json({message:"password is incorrect"});
        }
        // create token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"});
        return res.status(200).json({message:"Login successfullly",user,token});
    } catch (error) {
        console.log("failed to login",error);
        return res.status(500).json({message:"failed to login"});
    }
}

export const handleLogout = async(req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message:"Logout successfullly"});
    } catch (error) {
        console.log("failed to logout",error);
        return res.status(500).json({message:"failed to logout"});
    }
}




