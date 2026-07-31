const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateInterviewQuestions({
    jobRole,
    technology,
    experience,
    difficulty,
    totalQuestions
}) {
   
    const prompt = `

You are an expert technical interviewer.

Generate exactly ${totalQuestions} interview questions.

Job Role: ${jobRole}
Technology: ${technology}
Experience: ${experience} years
Difficulty: ${difficulty}

The questions should match the candidate's experience level.

Mix conceptual and practical questions.

Avoid asking questions that are significantly above this experience level.

Start with basic concepts, then intermediate, then one or two challenging questions.

Return ONLY valid JSON.

Do not return markdown.

Do not return explanations.

JSON format:

[
   {
      "question":"..."
   }
]

`;


try{

    const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt
});

const text = response.text;

const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

const questions = JSON.parse(cleanedText);

return questions;


}catch(err){
    console.log(err);
    throw new Error("Failed to generate the interview question")
}

}


async function evaluateInterview(questions) {

const prompt = `
You are an experienced technical interviewer.

Evaluate each interview answer fairly.

For each question provide:
- score (0-10)
- feedback

Finally provide:
- overallScore (0-100)
- overallFeedback
- strengths (array)
- weaknesses (array)
- suggestions (array)

Return ONLY valid JSON.

Do NOT return markdown.
Do NOT return explanations.

Return JSON in exactly this format:

{
  "questions": [
    {
      "score": 8,
      "feedback": "Good explanation of closures, but mention lexical scope."
    }
  ],
  "overallScore": 80,
  "overallFeedback": "Good overall performance with room for improvement.",
  "strengths": [
    "Strong JavaScript fundamentals"
  ],
  "weaknesses": [
    "Needs better understanding of asynchronous programming"
  ],
  "suggestions": [
    "Practice Event Loop and Promises",
    "Improve API design concepts"
  ]
}

Interview:

${JSON.stringify(questions)}
`;
try{

const response=await ai.models.generateContent({
    model:"gemini-3.6-flash",
    contents:prompt
})

const text=response.text;
const cleanedText=text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();


const evaluation = JSON.parse(cleanedText);

return evaluation;

}catch(err){
    console.log(err);
    throw new Error("Failed to evaluate the interview")
}

}


module.exports = {
    generateInterviewQuestions,evaluateInterview
};
