import mongoose from "mongoose";
const PaperSchema = mongoose.Schema({
     userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
     stream:{type:String,required:true},
     subject:{type:String,required:true},
     title:{type:String,required:true},
     examtype:{type:String,default:"Semester exam"},
     year:{type:String,required:true},
     university:{type:String,required:true},
     fileUrl:{type:String,required:true},
     status:{type:String,default:"pending",enum:["pending","approved","rejected"]},
},{timestamps:true});

const PaperModel = mongoose.model("Paper",PaperSchema);
export default PaperModel