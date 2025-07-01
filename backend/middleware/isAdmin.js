

export const isAdmin = async(req,res,next)=>{
    try {
        // console.log("req.user",req.user);
        if(!req.userData || req.userData.role !== "admin"){
            return res.status(401).json({message:"Unauthorized you are not admin"});
        }
        next();
    } catch (error) {
        console.log("failed to authenticate",error);
        return res.status(401).json({message:"Something went wrong"});
    }
}