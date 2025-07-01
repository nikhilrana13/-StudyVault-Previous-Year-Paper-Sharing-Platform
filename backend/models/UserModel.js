import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
     name:{type:String,required:true},
     email:{type:String,required:true},
     password:{type:String,required:true},
     profilepic:{type:String},
     role:{type:String,default:"student"},
     uploadpapers:[{type:mongoose.Schema.Types.ObjectId,ref:"Paper"}],
},{timestamps:true});

const UserModel = mongoose.model("User",UserSchema);
export default UserModel