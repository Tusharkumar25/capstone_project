import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Trophy,
  Clock,
  Code2,
  BarChart3,
} from "lucide-react";

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openQuestion, setOpenQuestion] = useState(null);

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
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-orange-500" />

          <p className="text-gray-400">
            Loading result...
          </p>
        </div>
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

  const score = interview.overallScore || 0;

  let performance = "Needs Improvement";
  let performanceColor = "text-red-400";

  if (score >= 80) {
    performance = "Excellent Performance";
    performanceColor = "text-green-400";
  } else if (score >= 60) {
    performance = "Good Performance";
    performanceColor = "text-orange-400";
  } else if (score >= 40) {
    performance = "Average Performance";
    performanceColor = "text-yellow-400";
  }

  const circumference = 2 * Math.PI * 52;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#08090b] px-4 py-8 text-white sm:px-6 sm:py-10">

      <div className="mx-auto max-w-6xl">

        {/* ================= BACK ================= */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-gray-400 transition hover:text-orange-400"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>


        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400">
              <Trophy className="h-6 w-6 text-black" />
            </div>

            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">
                Interview Result
              </h1>

              <p className="mt-1 text-gray-400">
                Here is your AI-powered interview performance report
              </p>
            </div>

          </div>

        </div>


        {/* ================= INTERVIEW INFO ================= */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-[#0d0f12] p-5">

            <div className="mb-3 flex items-center gap-2 text-gray-500">
              <Code2 size={18} />
              <span className="text-sm">
                Job Role
              </span>
            </div>

            <p className="font-semibold">
              {interview.jobRole}
            </p>

          </div>


          <div className="rounded-2xl border border-white/10 bg-[#0d0f12] p-5">

            <div className="mb-3 flex items-center gap-2 text-gray-500">
              <BarChart3 size={18} />
              <span className="text-sm">
                Technology
              </span>
            </div>

            <p className="font-semibold">
              {interview.technology}
            </p>

          </div>


          <div className="rounded-2xl border border-white/10 bg-[#0d0f12] p-5">

            <div className="mb-3 flex items-center gap-2 text-gray-500">
              <Trophy size={18} />
              <span className="text-sm">
                Difficulty
              </span>
            </div>

            <p className="font-semibold">
              {interview.difficulty}
            </p>

          </div>


          <div className="rounded-2xl border border-white/10 bg-[#0d0f12] p-5">

            <div className="mb-3 flex items-center gap-2 text-gray-500">
              <Clock size={18} />
              <span className="text-sm">
                Questions
              </span>
            </div>

            <p className="font-semibold">
              {interview.questions?.length || 0}
            </p>

          </div>

        </div>


        {/* ================= SCORE ================= */}

        <div className="rounded-3xl border border-white/10 bg-[#0d0f12] p-8 shadow-2xl">

          <div className="flex flex-col items-center justify-center">

            <p className="text-sm uppercase tracking-widest text-gray-500">
              Overall Score
            </p>


            {/* Circular Score */}

            <div className="relative mt-6 h-40 w-40">

              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 120 120"
              >

                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/10"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={progress}
                  className="transition-all duration-1000"
                />

                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#ef4444"
                    />

                    <stop
                      offset="50%"
                      stopColor="#f97316"
                    />

                    <stop
                      offset="100%"
                      stopColor="#facc15"
                    />
                  </linearGradient>
                </defs>

              </svg>


              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-4xl font-bold">
                  {score}
                </span>

                <span className="text-xs text-gray-500">
                  / 100
                </span>

              </div>

            </div>


            <h2
              className={`mt-5 text-xl font-semibold ${performanceColor}`}
            >
              {performance}
            </h2>

          </div>

        </div>


        {/* ================= OVERALL FEEDBACK ================= */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

          <h2 className="text-xl font-semibold">
            Overall Feedback
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            {interview.overallFeedback ||
              "No overall feedback available."}
          </p>

        </div>


        {/* ================= STRENGTHS / WEAKNESSES ================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Strengths */}

          <div className="rounded-2xl border border-green-500/10 bg-[#0d0f12] p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                <CheckCircle2 className="text-green-400" size={20} />
              </div>

              <h2 className="text-xl font-semibold text-green-400">
                Strengths
              </h2>

            </div>


            <div className="mt-5 space-y-3">

              {interview.strengths?.length > 0 ? (
                interview.strengths.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-gray-300"
                  >
                    <div className="flex gap-3">

                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-green-400"
                      />

                      <span>
                        {item}
                      </span>

                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No strengths available.
                </p>
              )}

            </div>

          </div>


          {/* Weaknesses */}

          <div className="rounded-2xl border border-red-500/10 bg-[#0d0f12] p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                <AlertCircle className="text-red-400" size={20} />
              </div>

              <h2 className="text-xl font-semibold text-red-400">
                Areas to Improve
              </h2>

            </div>


            <div className="mt-5 space-y-3">

              {interview.weaknesses?.length > 0 ? (
                interview.weaknesses.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-gray-300"
                  >
                    <div className="flex gap-3">

                      <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-red-400"
                      />

                      <span>
                        {item}
                      </span>

                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No weaknesses available.
                </p>
              )}

            </div>

          </div>

        </div>


        {/* ================= SUGGESTIONS ================= */}

        <div className="mt-6 rounded-2xl border border-yellow-500/10 bg-[#0d0f12] p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
              <Lightbulb className="text-yellow-400" size={20} />
            </div>

            <h2 className="text-xl font-semibold text-yellow-400">
              Suggestions for Improvement
            </h2>

          </div>


          <div className="mt-5 grid gap-3 md:grid-cols-2">

            {interview.suggestions?.length > 0 ? (
              interview.suggestions.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-gray-300"
                >
                  <div className="flex gap-3">

                    <Lightbulb
                      size={18}
                      className="mt-0.5 shrink-0 text-yellow-400"
                    />

                    <span>
                      {item}
                    </span>

                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No suggestions available.
              </p>
            )}

          </div>

        </div>


        {/* ================= QUESTIONS ================= */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              Question-wise Performance
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review your answers and AI feedback for each question.
            </p>

          </div>


          <div className="space-y-3">

            {interview.questions?.map(
              (question, index) => {

                const isOpen = openQuestion === index;

                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
                  >

                    {/* Question Header */}

                    <button
                      type="button"
                      onClick={() =>
                        setOpenQuestion(
                          isOpen ? null : index
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-white/[0.04]"
                    >

                      <div className="flex min-w-0 items-center gap-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-sm font-semibold text-orange-400">
                          {index + 1}
                        </div>

                        <p className="truncate font-medium text-gray-200">
                          {question.question}
                        </p>

                      </div>


                      <div className="flex shrink-0 items-center gap-3">

                        <span
                          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                            question.score >= 8
                              ? "bg-green-500/10 text-green-400"
                              : question.score >= 6
                              ? "bg-orange-500/10 text-orange-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {question.score}/10
                        </span>

                        {isOpen ? (
                          <ChevronUp
                            size={18}
                            className="text-gray-500"
                          />
                        ) : (
                          <ChevronDown
                            size={18}
                            className="text-gray-500"
                          />
                        )}

                      </div>

                    </button>


                    {/* Question Details */}

                    {isOpen && (
                      <div className="border-t border-white/10 p-5">

                        {/* Question */}

                        <div>

                          <p className="text-xs uppercase tracking-wider text-orange-400">
                            Question
                          </p>

                          <p className="mt-2 leading-7 text-gray-300">
                            {question.question}
                          </p>

                        </div>


                        {/* Answer */}

                        <div className="mt-5">

                          <p className="text-xs uppercase tracking-wider text-gray-500">
                            Your Answer
                          </p>

                          <div className="mt-2 rounded-xl bg-white/[0.03] p-4">

                            <p className="whitespace-pre-wrap leading-7 text-gray-400">
                              {question.answer ||
                                "No answer provided."}
                            </p>

                          </div>

                        </div>


                        {/* AI Feedback */}

                        <div className="mt-5">

                          <p className="text-xs uppercase tracking-wider text-gray-500">
                            AI Feedback
                          </p>

                          <div className="mt-2 rounded-xl border border-orange-500/10 bg-orange-500/[0.03] p-4">

                            <p className="leading-7 text-gray-400">
                              {question.feedback ||
                                "No feedback available."}
                            </p>

                          </div>

                        </div>

                      </div>
                    )}

                  </div>
                );
              }
            )}

          </div>

        </div>


        {/* ================= BOTTOM BUTTON ================= */}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-xl border border-white/10 px-8 py-3 font-semibold text-gray-300 transition hover:border-orange-500/40 hover:text-white sm:w-auto"
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => navigate("/interview/setup")}
            className="w-full rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-8 py-3 font-semibold text-black transition hover:scale-105 sm:w-auto"
          >
            Take Another Interview
          </button>

        </div>

      </div>

    </div>
  );
}

export default Result;