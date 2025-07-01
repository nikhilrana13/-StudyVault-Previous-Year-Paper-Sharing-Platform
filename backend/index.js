import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import UserRoute from "./routes/UserRoute.js";
import PaperRoute from "./routes/PaperRoute.js";




dotenv.config();
const app = express();


// middlewares
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));




// routes
app.use("/api/auth",UserRoute);
app.use("/api/papers",PaperRoute);


// connect to db 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("failed to connect to DB", err);
})




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

