const express=require('express');
const router=express.Router();
const {authUser}=require('../middleware/auth.middleware');
const interviewController=require('../controllers/interview.controller')

router.post("/create",authUser,interviewController.createInterview);
router.get("/stats",authUser,interviewController.getInterviewStats);
router.get("/recent",authUser,interviewController.getRecentInterviews);
router.get(
    "/",
    authUser,
    interviewController.getAllInterviews
);
router.get("/:id", authUser, interviewController.getInterviewById);
router.post("/:id/answer", authUser, interviewController.saveAnswer);
router.post("/:id/submit", authUser, interviewController.submitInterview);





module.exports=router;
