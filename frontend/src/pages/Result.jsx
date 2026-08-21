import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
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
            "Failed to load result"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-white">
        Loading result...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-red-400">
        Result not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090b] px-6 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Interview Result
          </h1>

          <p className="mt-2 text-gray-400">
            {interview.jobRole} • {interview.technology}
          </p>
        </div>


        {/* Score */}

        <div className="rounded-3xl border border-white/10 bg-[#0d0f12] p-8 text-center">

          <p className="text-gray-400">
            Overall Score
          </p>

          <div className="mt-3 text-6xl font-bold text-orange-400">
            {interview.overallScore}
          </div>

          <p className="mt-2 text-gray-500">
            out of 100
          </p>

        </div>


        {/* Overall Feedback */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

          <h2 className="text-xl font-semibold">
            Overall Feedback
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            {interview.overallFeedback}
          </p>

        </div>


        {/* Strengths / Weaknesses */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Strengths */}

          <div className="rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

            <h2 className="text-xl font-semibold text-green-400">
              Strengths
            </h2>

            <ul className="mt-4 space-y-3">

              {interview.strengths?.map(
                (item, index) => (
                  <li
                    key={index}
                    className="rounded-lg bg-white/5 p-3 text-gray-300"
                  >
                    ✓ {item}
                  </li>
                )
              )}

            </ul>

          </div>


          {/* Weaknesses */}

          <div className="rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

            <h2 className="text-xl font-semibold text-red-400">
              Weaknesses
            </h2>

            <ul className="mt-4 space-y-3">

              {interview.weaknesses?.map(
                (item, index) => (
                  <li
                    key={index}
                    className="rounded-lg bg-white/5 p-3 text-gray-300"
                  >
                    • {item}
                  </li>
                )
              )}

            </ul>

          </div>

        </div>


        {/* Suggestions */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

          <h2 className="text-xl font-semibold text-yellow-400">
            Suggestions
          </h2>

          <ul className="mt-4 space-y-3">

            {interview.suggestions?.map(
              (item, index) => (
                <li
                  key={index}
                  className="rounded-lg bg-white/5 p-3 text-gray-300"
                >
                  💡 {item}
                </li>
              )
            )}

          </ul>

        </div>


        {/* Question Performance */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

          <h2 className="text-xl font-semibold">
            Question-wise Performance
          </h2>

          <div className="mt-5 space-y-4">

            {interview.questions.map(
              (question, index) => (

                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-sm text-orange-400">
                        Question {index + 1}
                      </p>

                      <p className="mt-2 text-gray-200">
                        {question.question}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg bg-orange-500/10 px-3 py-2 font-semibold text-orange-400">
                      {question.score}/10
                    </span>

                  </div>

                  <div className="mt-4">

                    <p className="text-sm text-gray-500">
                      Your Answer
                    </p>

                    <p className="mt-1 text-gray-400">
                      {question.answer}
                    </p>

                  </div>

                  <div className="mt-4">

                    <p className="text-sm text-gray-500">
                      AI Feedback
                    </p>

                    <p className="mt-1 text-gray-400">
                      {question.feedback}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>


        {/* Back Button */}

        <div className="mt-8 text-center">

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-8 py-3 font-semibold text-black transition hover:scale-105"
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default Result;