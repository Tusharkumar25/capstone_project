import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
 import { useNavigate } from "react-router-dom";



function Interview() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
   
  const navigate = useNavigate();

async function saveCurrentAnswer() {
  try {
    await axios.post(
      `http://localhost:3000/api/interview/${id}/answer`,
      {
        questionIndex: currentQuestion,
        answer: answer,
      },
      {
        withCredentials: true,
      }
    );

    return true;

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to save answer"
    );

    return false;
  }
}

async function submitInterview() {
    
  try {
    const response = await axios.post(
      `http://localhost:3000/api/interview/${id}/submit`,
      {},
      {
        withCredentials: true,
      }
    );

    console.log("Interview evaluation:", response.data);

    toast.success(response.data.message);

    navigate(`/interview/${id}/result`);

    // Next step mein result page par navigate karenge

  } catch (error) {
    console.error("Submit interview error:", error);
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    toast.error(
      error.response?.data?.message ||
        "Failed to submit interview"
    );
  }
}




  useEffect(() => {
    async function fetchInterview() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/interview/${id}`,
          {
            withCredentials: true,
          }
        );

        setInterview(response.data.interview);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load interview"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchInterview();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-white">
        Loading interview...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-red-400">
        Interview not found
      </div>
    );
  }

  const question = interview.questions[currentQuestion];

  const isFirstQuestion = currentQuestion === 0;

  const isLastQuestion =
    currentQuestion === interview.questions.length - 1;

  return (
    <div className="min-h-screen bg-[#08090b] px-6 py-10 text-white">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            {interview.jobRole} Interview
          </h1>

          <p className="mt-2 text-gray-400">
            {interview.technology} •{" "}
            {interview.difficulty}
          </p>

        </div>


        {/* Progress */}

        <div className="mb-6">

          <div className="mb-2 flex justify-between text-sm">

            <span className="text-gray-400">
              Question {currentQuestion + 1} of{" "}
              {interview.questions.length}
            </span>

            <span className="text-orange-400">
              {Math.round(
                ((currentQuestion + 1) /
                  interview.questions.length) *
                  100
              )}
              %
            </span>

          </div>


          <div className="h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 transition-all duration-500"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    interview.questions.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>


        {/* Question Card */}

        <div className="rounded-3xl border border-white/10 bg-[#0d0f12] p-8 shadow-2xl">

          <p className="text-sm text-orange-400">
            Question {currentQuestion + 1}
          </p>

          <h2 className="mt-4 text-xl font-semibold leading-relaxed">
            {question.question}
          </h2>


          {/* Answer */}

          <div className="mt-8">

            <label className="mb-2 block text-sm font-medium text-gray-300">
              Your Answer
            </label>

            <textarea
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              placeholder="Type your answer here..."
              rows={8}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none transition placeholder:text-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />

          </div>


          {/* Navigation */}

          <div className="mt-6 flex items-center justify-between">

            <button
              type="button"
              disabled={isFirstQuestion}
              onClick={() =>
                setCurrentQuestion(
                  (prev) => prev - 1
                )
              }
              className="rounded-xl border border-white/10 px-6 py-3 font-medium text-gray-300 transition hover:border-orange-500/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>


            {!isLastQuestion ? (

              <button
                type="button"
                onClick={async () => {

                if (!answer.trim()) {
                    toast.error("Please enter your answer");
                    return;
                }

                const saved = await saveCurrentAnswer();

                if (!saved) return;

                setCurrentQuestion((prev) => prev + 1);

                setAnswer("");
                }}
                className="rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-7 py-3 font-semibold text-black transition hover:scale-105"
              >
                Next →
              </button>

            ) : (

                <button
                type="button"
                onClick={async () => {
                    if (!answer.trim()) {
                    toast.error("Please enter your answer");
                    return;
                    }

                    const saved = await saveCurrentAnswer();

                    if (!saved) return;

                    

                    toast.success("Answer saved. Submitting interview...");

                    await submitInterview();

                    // abhi temporary
                    console.log("All answers saved");
                }}
                className="rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-7 py-3 font-semibold text-black transition hover:scale-105"
                >
                Submit Interview
                </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Interview;