import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ChevronRight,
  Mic,
  Trophy,
} from "lucide-react";

function AllInterviews() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInterviews() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/interview",
          {
            withCredentials: true,
          }
        );

        setInterviews(response.data.interviews || []);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load interviews"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchInterviews();
  }, []);

  function getStatus(interview) {
    if (interview.status !== "Completed") {
      return interview.status;
    }

    if (interview.overallScore >= 80) {
      return "Excellent";
    }

    if (interview.overallScore >= 60) {
      return "Good";
    }

    return "Average";
  }

  function getStatusColor(status) {
    if (status === "Excellent") {
      return "text-green-400 bg-green-500/10";
    }

    if (status === "Good") {
      return "text-orange-400 bg-orange-500/10";
    }

    if (status === "Average") {
      return "text-yellow-400 bg-yellow-500/10";
    }

    if (status === "Completed") {
      return "text-green-400 bg-green-500/10";
    }

    return "text-gray-400 bg-white/5";
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-white">
        Loading interviews...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090b] px-4 py-8 text-white sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* Back */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-gray-400 transition hover:text-orange-400"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>


        {/* Header */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400">
              <Trophy className="h-6 w-6 text-black" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                All Interviews
              </h1>

              <p className="mt-1 text-gray-400">
                View your complete interview history
              </p>
            </div>

          </div>

        </div>


        {/* Interviews */}

        {interviews.length === 0 ? (

          <div className="rounded-2xl border border-white/10 bg-[#0d0f12] p-10 text-center">

            <Mic className="mx-auto mb-4 h-10 w-10 text-gray-600" />

            <h2 className="text-xl font-semibold">
              No interviews yet
            </h2>

            <p className="mt-2 text-gray-500">
              Start your first AI interview to see it here.
            </p>

            <button
              onClick={() => navigate("/interview/setup")}
              className="mt-6 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-6 py-3 font-semibold text-black"
            >
              Start Interview
            </button>

          </div>

        ) : (

          <div className="space-y-3">

            {interviews.map((interview) => {

              const status = getStatus(interview);

              return (
                <button
                  key={interview._id}
                  type="button"
                  onClick={() =>
                    navigate(
                      interview.status === "Completed"
                        ? `/result/${interview._id}`
                        : `/interview/${interview._id}`
                    )
                  }
                  className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-[#0d0f12] p-5 text-left transition hover:border-orange-500/30 hover:bg-white/[0.03]"
                >

                  {/* Icon */}

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Mic size={20} />
                  </div>


                  {/* Details */}

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate font-semibold">
                      {interview.jobRole}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {interview.technology}
                      {" • "}
                      {interview.difficulty}
                      {" • "}
                      {interview.totalQuestions} Questions
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      {new Date(
                        interview.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>


                  {/* Score */}

                  <div className="hidden text-right sm:block">

                    <p className="font-bold">
                      {interview.status === "Completed"
                        ? `${interview.overallScore}%`
                        : "--"}
                    </p>

                    <p
                      className={`mt-1 inline-block rounded-lg px-2 py-1 text-xs ${getStatusColor(
                        status
                      )}`}
                    >
                      {status}
                    </p>

                  </div>


                  {/* Arrow */}

                  <ChevronRight
                    className="shrink-0 text-gray-600 transition group-hover:translate-x-1 group-hover:text-orange-400"
                    size={20}
                  />

                </button>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default AllInterviews;