const userModel=require("../models/user.model")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")

async function registerUser(req,res){
 
    const {name,email,password}=req.body;

    if(!name || !email|| !password){
        return res.status(400).json({
            success:false,
            message:"ALL fields are required "
        });
    }

    const existingUser=await userModel.findOne({email})

    if(existingUser){
        return res.status(409).json({
            message:"user is already exist"
        })
    }
     
   if(password.length<6){
    return res.status(400).json({
        success:false,
        message:"Password must be at least 6 character long"
    });
   }

    const hash=await bcrypt.hash(password,10);

    const user=await userModel.create({
        name,
        email,
        password:hash
    })

    res.status(201).json({
        success:true,
        message:"User register successfully"
    });

}


async function loginUser(req,res){

    const{email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fileds are required"
        })
    }
     
    const user=await userModel.findOne({
        email
    })

    if(!user){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }

    const passwordValid=await bcrypt.compare(password,user.password);

    if(!passwordValid){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }

    const token=jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:"7d"})

    res.cookie("token",token,{
       httpOnly:true,
       secure:process.env.NODE_ENV==="production",
       maxAge:7*24*60*60*1000
    });

    return res.status(200).json({
        success:true,
        message:"user Login Successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })

}

async function getProfile(req,res){
    return res.status(200).json({
        success:true,
        message:"profile fetched successfully",
        user:{
            id:req.user._id,
            name:req.user.name,
            email:req.user.email
        }
    });
}


module.exports={registerUser,loginUser,getProfile};