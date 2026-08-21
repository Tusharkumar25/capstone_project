const interviewModel = require("../models/interview.model");
const geminiService=require('../services/gemini.service')


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

const questions =
await geminiService.generateInterviewQuestions({
    jobRole,
    technology,
    experience,
    difficulty,
    totalQuestions
});


const interview = await interviewModel.create({
    user: req.user._id,
    jobRole,
    technology,
    experience,
    difficulty,
    totalQuestions,
    questions
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
        message: err.message
    });
}

}


async function getInterviewById(req, res) {
    try {
        const { id } = req.params;

        const interview = await interviewModel.findById(id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        if (interview.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        return res.status(200).json({
            success: true,
            interview
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

async function saveAnswer(req, res) {
  try{
    const{id}=req.params;
    const{questionIndex,answer}=req.body;

    const interview=await interviewModel.findById(id);

    if(!interview){
        return res.status(404).json({
            success:false,
            message:"interview not found"
        })
    }

    if(interview.user.toString()!==req.user._id.toString()){
        return res.status(403).json({
            success:false,
            message:"Access denied"
        })
    }

    if ( questionIndex < 0 || questionIndex >= interview.questions.length) {
    return res.status(400).json({
        success: false,
        message: "Invalid question index"
    });
}

    interview.questions[questionIndex].answer = answer;

    await interview.save();

   return res.status(200).json({
    success: true,
    message: "Answer saved successfully",
    interview
});

}catch(err){
    console.log(err);
    return res.status(500).json({
        success:false,
        message:"Internal Server error"
    })
  }
}


async function submitInterview(req,res){
    try{

     const { id } = req.params;
     const interview = await interviewModel.findById(id);
     if (!interview) {
    return res.status(404).json({
        success: false,
        message: "Interview not found"
    });
}


if (interview.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
        success: false,
        message: "Access denied"
    });
}


if (interview.status === "Completed") {
    return res.status(409).json({
        success: false,
        message: "Interview has already been submitted."
    });
}

const allAnswered = interview.questions.every(question =>
    question.answer.trim() !== ""
);

if (!allAnswered) {
    return res.status(400).json({
        success: false,
        message: "Please answer all questions before submitting."
    });
}

const evaluation = await geminiService.evaluateInterview(interview.questions);

evaluation.questions.forEach((item, index) => {
    interview.questions[index].score = item.score;
    interview.questions[index].feedback = item.feedback;
});

interview.overallScore = evaluation.overallScore;
interview.overallFeedback = evaluation.overallFeedback;

interview.strengths = evaluation.strengths;
interview.weaknesses = evaluation.weaknesses;
interview.suggestions = evaluation.suggestions;

interview.status = "Completed";

await interview.save();

return res.status(200).json({
    success: true,
    message: "Interview evaluated successfully.",
    interview
});

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}


async function getInterviewStats(req, res) {
    try {
        const userId = req.user._id;

        const interviews = await interviewModel.find({
            user: userId
        });

        const totalInterviews = interviews.length;

        const completedInterviews = interviews.filter(
            interview => interview.status === "Completed"
        );

        // Average Score
        let averageScore = 0;

        if (completedInterviews.length > 0) {
            const totalScore = completedInterviews.reduce(
                (sum, interview) => sum + interview.overallScore,
                0
            );

            averageScore = Math.round(
                totalScore / completedInterviews.length
            );
        }

        // Questions Answered
        let questionsAnswered = 0;

        completedInterviews.forEach(interview => {
            interview.questions.forEach(question => {
                if (question.answer && question.answer.trim() !== "") {
                    questionsAnswered++;
                }
            });
        });

        // Improvement
        let improvement = 0;

        if (completedInterviews.length >= 2) {
            const sortedInterviews = [...completedInterviews].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );

            const firstScore = sortedInterviews[0].overallScore;
            const latestScore =
                sortedInterviews[sortedInterviews.length - 1].overallScore;

            if (firstScore > 0) {
                improvement = Math.round(
                    ((latestScore - firstScore) / firstScore) * 100
                );
            }
        }

        return res.status(200).json({
            success: true,
            stats: {
                totalInterviews,
                averageScore,
                questionsAnswered,
                improvement
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch interview statistics"
        });
    }
}


async function getRecentInterviews(req, res) {
    try {
        const interviews = await interviewModel
            .find({
                user: req.user._id
            })
            .sort({ createdAt: -1 })
            .limit(5)
            .select(
                "jobRole technology difficulty overallScore status createdAt"
            );

        return res.status(200).json({
            success: true,
            interviews
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch recent interviews"
        });
    }
}


module.exports={createInterview,getInterviewById,saveAnswer,submitInterview,getInterviewStats,getRecentInterviews};