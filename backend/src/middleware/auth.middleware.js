
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUser(req,res,next){
     
    const token =req.cookies.token;

    if(!token){
       return res.status(401).json({
            success:false,
            message:"Unauthorized"
        });
    }

   try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
    req.user=user;
     next();

   }catch(err){
    console.error(err);
    return res.status(401).json({
        success:false,
        message:"Unauthorized"
    });
   }

}

module.exports={authUser};