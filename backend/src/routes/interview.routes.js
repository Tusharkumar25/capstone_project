const express=require('express');
const router=express.Router();
const {authUser}=require('../middleware/auth.middleware');
const interviewController=require('../controllers/interview.controller')

router.post("/create",authUser,interviewController.createInterview);
router.get("/:id", authUser, interviewController.getInterviewById);

module.exports=router;
