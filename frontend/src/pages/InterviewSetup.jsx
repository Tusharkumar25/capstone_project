import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, BrainCircuit, Play } from "lucide-react";

function InterviewSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobRole: "",
    technology: "",
    experience: "",
    difficulty: "Medium",
    totalQuestions: 5,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:3000/api/interview/create",
      {
        ...formData,
        experience: Number(formData.experience),
        totalQuestions: Number(formData.totalQuestions),
      },
      {
        withCredentials: true,
      }
    );

    toast.success(response.data.message);

    console.log("Created Interview:", response.data.interview);

    // Next step:
    // navigate(`/interview/${response.data.interview._id}`);

    navigate(`/interview/${response.data.interview._id}`);

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to create interview"
    );
  }
}

  return (
    <div className="min-h-screen bg-[#08090b] px-6 py-10 text-white">

      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-gray-400 transition hover:text-orange-400"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 shadow-lg shadow-orange-500/20">
            <BrainCircuit className="h-8 w-8 text-black" />
          </div>

          <h1 className="text-4xl font-bold">
            Setup Your{" "}
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              AI Interview
            </span>
          </h1>

          <p className="mt-3 text-gray-400">
            Customize your interview according to your role and experience.
          </p>

        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#0d0f12] p-8 shadow-2xl"
        >

          {/* Job Role */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Job Role
            </label>

            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Technology */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Technology
            </label>

            <input
              type="text"
              name="technology"
              value={formData.technology}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, Java"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Experience
            </label>

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Years of experience"
              min="0"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Difficulty
            </label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#15171b] px-4 py-3 text-white outline-none transition focus:border-orange-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Questions */}
          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium text-gray-300">
              Number of Questions
            </label>

            <div className="grid grid-cols-2 gap-4">

              {[5, 10].map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      totalQuestions: number,
                    }))
                  }
                  className={`rounded-xl border py-3 font-semibold transition ${
                    formData.totalQuestions === number
                      ? "border-orange-500 bg-orange-500/10 text-orange-400"
                      : "border-white/10 bg-white/5 text-gray-400 hover:border-orange-500/40"
                  }`}
                >
                  {number} Questions
                </button>
              ))}

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 py-4 font-semibold text-black shadow-lg shadow-orange-500/20 transition hover:scale-[1.02]"
          >
            <Play size={20} />
            Start AI Interview
          </button>

        </form>

      </div>
    </div>
  );
}

export default InterviewSetup;