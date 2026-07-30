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

module.exports = {
    generateInterviewQuestions
};
