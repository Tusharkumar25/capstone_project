const interviewModel = require("../models/interview.model");
async function createInterview(req, res) {

    const {
    
    jobRole,
    technology,
    experience,
    difficulty,
    totalQuestions
} = req.body;


if (
    !jobRole ||
    !technology ||
    experience === undefined ||
    !difficulty ||
    !totalQuestions
) {
    return res.status(400).json({
        success: false,
        message: "All fields are required"
    });
}

try{
    const interview=await interviewModel.create({
    user: req.user._id,
    jobRole,
    technology,
    experience,
    difficulty,
    totalQuestions
});

 return res.status(201).json({
    success:true,
    message:"Interview created successfully",
    interview
})

}catch(err){
    console.error(err);
       return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}

}


module.exports={createInterview};