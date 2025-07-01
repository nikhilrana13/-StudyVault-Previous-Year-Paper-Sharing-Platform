import express from "express";
import { Getallpapers, UploadPaper, GetEachUserpaper, GetOnlyapprovedPapers, ApprovePaper,Eachpaperdetails, paperdelete } from "../controllers/paperController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAdmin } from "../middleware/isAdmin.js";
import multer from "multer";


const router = express.Router();
// multer configuration
const storage = multer.memoryStorage();
const upload = multer({storage:storage,limits:{fileSize:50*1024*1024},fileFilter:(req,file,cb)=>{
    // Allow only pdf and images
    if (
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
}});


// paper routes
router.post("/uploadpaper",upload.single("paper"),isAuthenticated,UploadPaper)
router.get("/getallpapers",isAuthenticated,isAdmin,Getallpapers)
router.get("/userpapers",isAuthenticated,GetEachUserpaper)
router.get("/approvedpapers",GetOnlyapprovedPapers)
router.put("/approvepaper/:id",isAuthenticated,isAdmin,ApprovePaper)
router.get("/eachpaper/:id",Eachpaperdetails)
router.delete("/deletepaper/:id",isAuthenticated,paperdelete)


export default router