import cloudinary from "../config/cloudinary.js";
import PaperModel from "../models/paperModel.js";
import UserModel from "../models/UserModel.js";
import streamifier from "streamifier";



export const UploadPaper = async(req,res)=>{

 try {
    const userId = req.user;
    const { stream, subject, title, examtype, year, university } = req.body;

    if (!stream || !subject || !title || !year || !university) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await UserModel.findById(userId);
    if (!user) return res.status(400).json({ message: "user not found" });
    if (!req.file)
      return res.status(400).json({ message: "Please upload the paper" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "papers",
          resource_type: "raw", 
          public_id: `paper-${Date.now()}.pdf`,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const paper = await PaperModel.create({
      userId,
      stream,
      subject,
      title,
      examtype,
      year,
      university,
      status: "pending",
      fileUrl: result.secure_url, // this is raw URL
    });

    user.uploadpapers.push(paper._id);
    await user.save();

    return res.status(200).json({ message: "Paper uploaded successfully", paper });
  } catch (error) {
    console.log("failed to upload paper", error);
    return res.status(500).json({ message: "failed to upload paper" });
  }
}

export const Getallpapers = async(req,res)=>{
    try {
        const userId = req.user;
        const user = await UserModel.findById(userId)
        if(!user){
            return res.status(400).json({message:"user not found"});
        }

        const paper = await PaperModel.find({}).populate("userId","name email");
        if(!paper){
            return res.status(400).json({message:"no papers found"});
        }
        return res.status(200).json({message:"papers",paper});
    } catch (error) {
        console.log("failed to get papers",error);
        return res.status(500).json({message:"failed to get papers"});        
    }
}

export const GetOnlyapprovedPapers = async(req,res)=>{
    try {
        // const userId = req.user;
        // const user = await UserModel.findById(userId)
        // if(!user){
        //     return res.status(400).json({message:"user not found"});
        // }

        const approvedpaper = await PaperModel.find({status:"approved"});
        if(!approvedpaper){
            return res.status(400).json({message:"no approved papers found"});
        }
        return res.status(200).json({message:"approved papers",approvedpaper});
        
    } catch (error) {
        console.log("failed to get approved papers",error);
        return res.status(500).json({message:"failed to get approved papers"}); 
    }
}
export const GetEachUserpaper = async(req,res)=>{
    try {
        const userId = req.user;
        const user = await UserModel.findById(userId)
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        const paper = await PaperModel.find({userId:userId});
        if(!paper){
            return res.status(400).json({message:"no papers found"});
        }
        return res.status(200).json({message:"papers",paper});
        
    } catch (error) {
        console.log("failed to get papers",error);
        return res.status(500).json({message:"failed to get papers"});
    }
}

export const Eachpaperdetails = async(req,res)=>{
    try {
        const paperid = req.params.id;
        
        const paper = await PaperModel.findById(paperid);
        if(!paper){
            return res.status(400).json({message:"paper not found"});
        }
        return res.status(200).json({message:"paper",paper});
    } catch (error) {
        console.log("failed to get paper",error);
        return res.status(500).json({message:"failed to get paper"});
    }
}
export const ApprovePaper = async(req,res)=>{
    try {
        const paperid = req.params.id;
        const {updatestatus} = req.body;
        const paper = await PaperModel.findById(paperid);
        if(!paper){
            return res.status(400).json({message:"paper not found"});
        }
        paper.status = updatestatus
        await paper.save();
        return res.status(200).json({message:"paper status updated successfully"});        
    } catch (error) {
        console.log("failed to approve paper",error);
        return res.status(500).json({message:"failed to approve paper"});
    }
}
export const paperdelete = async(req,res)=>{
    try {
        const userId = req.user;
        const user = await UserModel.findById(userId)
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        const paperid = req.params.id;
        // const paper = await PaperModel.findById(paperid);
        // if(!paper){
        //     return res.status(400).json({message:"paper not found"});
        // }
        const paper = await PaperModel.findByIdAndDelete(paperid);
        if(!paper){
            return res.status(400).json({message:"paper not found"});
        }
        user.uploadpapers.pull(paperid);
        await user.save();
        return res.status(200).json({message:"paper deleted successfully"});
    } catch (error) {
        console.log("failed to delete paper",error);
        return res.status(500).json({message:"failed to delete paper"});
    }
}

