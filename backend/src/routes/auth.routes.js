const express=require('express')
const authController=require("../controllers/auth.controller");
const {authUser}=require('../middleware/auth.middleware');
const router=express.Router();

router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser);
router.get('/profile',authUser,authController.getProfile)

module.exports=router;