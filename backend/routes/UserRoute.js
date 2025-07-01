import express from "express"
import { SignUp,Login,handleLogout } from "../controllers/UserController.js";
const router = express.Router();



router.post("/signup",SignUp);
router.post("/login",Login);
router.get("/logout",handleLogout);

export default router