import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const CreateAdmin = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);

        const adminexists = await UserModel.findOne({role:"admin"});
        if(adminexists){
            console.log("Admin already exists");
            return;
        }
        const hashedpassword = await bcrypt.hash(process.env.ADMIN_PASSWORD,10);
        const admin = await UserModel.create({
            name:"Admin",
            email:process.env.ADMIN_EMAIL,
            password:hashedpassword,
            role:"admin"
        });

        await admin.save();
        console.log("Admin created successfully");
        process.exit();
        
    } catch (error) {
        console.log("failed to create admin",error);
        process.exit(1);
    }
}

CreateAdmin();

