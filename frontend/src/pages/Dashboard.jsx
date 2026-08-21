import {
  LayoutDashboard,
  Mic,
  ChartNoAxesCombined,
  History,
  Settings,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  ChevronRight,
  Users,
  Star,
  FileText,
  Zap,
  BrainCircuit,
  LogOut,
} from "lucide-react";





import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [recentInterviews, setRecentInterviews] = useState([]);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            withCredentials: true,
          }
        );

        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }

    getProfile();
  }, []);



  const [stats, setStats] = useState({
  totalInterviews: 0,
  averageScore: 0,
  questionsAnswered: 0,
  improvement: 0,
});

useEffect(() => {
  async function fetchStats() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/interview/stats",
        {
          withCredentials: true,
        }
      );

      setStats(response.data.stats);

       // Recent Interviews
      const recentResponse = await axios.get(
        "http://localhost:3000/api/interview/recent",
        {
          withCredentials: true,
        }
      );

      setRecentInterviews(recentResponse.data.interviews);

    } catch (error) {
      console.error("Failed to fetch interview stats:", error);
    }
  }

  fetchStats();
}, []);

  return (
    <div className="min-h-screen bg-[#08090b] text-white">

      {/* ================= SIDEBAR ================= */}

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-white/10 bg-[#0c0e11] lg:flex lg:flex-col">

        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 shadow-lg shadow-orange-500/30">
            <BrainCircuit className="h-6 w-6 text-black" />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Jobify <span className="text-orange-400">AI</span>
            </h1>

            <p className="text-xs text-gray-500">
              AI Mock Interview
            </p>
          </div>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 px-4 py-6">

          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active
          />

          <SidebarItem
            icon={<Mic size={20} />}
            text="New Interview"
          />

          <SidebarItem
            icon={<ChartNoAxesCombined size={20} />}
            text="My Performance"
          />

          <SidebarItem
            icon={<History size={20} />}
            text="Interview History"
          />

          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
          />

        </nav>

        {/* Upgrade */}

        <div className="mx-4 mb-6 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 p-5">

          <div className="mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-400" />

            <h3 className="font-semibold">
              Upgrade to Pro
            </h3>
          </div>

          <p className="mb-4 text-sm leading-6 text-gray-400">
            Unlock unlimited interviews, advanced analytics and detailed feedback.
          </p>

          <button className="w-full rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 py-3 font-semibold text-black transition hover:scale-[1.02]">
            Upgrade Now
          </button>

        </div>

        {/* Profile */}

        <div className="border-t border-white/10 p-4">

          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-400 font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user?.name || "User"}
              </p>

              <p className="truncate text-xs text-gray-500">
                {user?.email || "Loading..."}
              </p>
            </div>

            <ChevronRight className="h-4 w-4 text-gray-500" />

          </div>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="min-h-screen lg:ml-64">

        <div className="mx-auto max-w-[1500px] p-5 sm:p-8">

          {/* ================= TOPBAR ================= */}

          <div className="mb-8 flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, <span className="text-orange-400">{user?.name || "User"}</span> ! 👋
              </h1>

              <p className="mt-1 text-gray-400">
                Ready to ace your next interview?
              </p>
            </div>


            <div className="flex items-center gap-4">

              {/* Search */}

              <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 md:flex">
                <Search className="h-5 w-5 text-gray-500" />

                <input
                  placeholder="Search..."
                  className="w-40 bg-transparent text-sm outline-none placeholder:text-gray-600"
                />
              </div>

              {/* Notification */}

              <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/10">
                <Bell className="h-5 w-5" />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
              </button>

              {/* User */}

              <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-orange-500/30 bg-gradient-to-br from-red-500 to-orange-400 font-bold sm:flex">
                T
              </div>

            </div>

          </div>


          {/* ================= HERO ================= */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-7 overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-r from-red-950/60 via-[#180c09] to-orange-950/50 p-8"
          >

            {/* Glow */}

            <div className="absolute right-20 top-10 h-64 w-64 rounded-full bg-orange-500/20 blur-[100px]" />

            <div className="relative z-10 max-w-xl">

              <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-300">
                Ready to practice?
              </span>

              <h2 className="mt-5 text-4xl font-bold leading-tight">
                Start a new
                <br />

                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                  AI Mock Interview
                </span>
              </h2>

              <p className="mt-4 text-gray-400">
                Get real-time AI feedback and improve your interview skills.
              </p>

              <button onClick={() => navigate("/interview/setup")} className="mt-7 flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-6 py-3 font-semibold text-black shadow-lg shadow-orange-500/20 transition hover:scale-105">

                <Plus size={20} />

                Start Interview

              </button>

            </div>


            {/* Hero Brain */}

            <div className="absolute right-16 top-1/2 hidden -translate-y-1/2 lg:block">

              <motion.div
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-52 w-52 items-center justify-center rounded-full"
              >

                <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-3xl" />

                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-orange-400/40 bg-orange-500/10 shadow-[0_0_60px_rgba(249,115,22,0.35)]">

                  <BrainCircuit className="h-20 w-20 text-orange-400" />

                </div>

              </motion.div>

            </div>

          </motion.section>


          {/* ================= STATS ================= */}

<div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

  <StatCard
    icon={<Users />}
    title="Interviews Completed"
    value={stats.totalInterviews}
    change="+20%"
  />

  <StatCard
    icon={<Star />}
    title="Average Score"
    value={`${stats.averageScore}%`}
    change="+15%"
  />

  <StatCard
    icon={<FileText />}
    title="Questions Answered"
    value={stats.questionsAnswered}
    change="+18%"
  />

  <StatCard
    icon={<Zap />}
    title="Improvement"
    value={`${stats.improvement}%`}
    change="+12%"
  />

</div>


          {/* ================= LOWER GRID ================= */}

          <div className="grid gap-6 xl:grid-cols-2">

            {/* Performance */}

            <section className="rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-semibold">
                    Performance Overview
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your interview performance
                  </p>
                </div>

                <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 outline-none">
                  <option>This Month</option>
                  <option>Last Month</option>
                </select>

              </div>

              {/* Fake chart */}

              <div className="relative h-64">

                <div className="absolute inset-0 flex flex-col justify-between">

                  {[100, 75, 50, 25, 0].map((value) => (
                    <div
                      key={value}
                      className="flex items-center gap-3"
                    >

                      <span className="w-8 text-xs text-gray-600">
                        {value}%
                      </span>

                      <div className="h-px flex-1 bg-white/5" />

                    </div>
                  ))}

                </div>

                <svg
                  viewBox="0 0 700 250"
                  className="absolute inset-8 h-[calc(100%-32px)] w-[calc(100%-32px)]"
                  preserveAspectRatio="none"
                >

                  <defs>

                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#f97316"
                        stopOpacity="0.4"
                      />

                      <stop
                        offset="100%"
                        stopColor="#f97316"
                        stopOpacity="0"
                      />

                    </linearGradient>

                  </defs>

                  <path
                    d="M0 180 C70 130 100 160 150 120 S230 170 280 110 S350 150 400 90 S480 140 520 80 S620 100 700 40 L700 250 L0 250 Z"
                    fill="url(#chartGradient)"
                  />

                  <path
                    d="M0 180 C70 130 100 160 150 120 S230 170 280 110 S350 150 400 90 S480 140 520 80 S620 100 700 40"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="4"
                  />

                </svg>

              </div>

            </section>

<section className="rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

  <div className="mb-5 flex items-center justify-between">

    <h2 className="text-xl font-semibold">
      Recent Interviews
    </h2>

    <button className="text-sm text-orange-400 hover:text-orange-300">
      View all
    </button>

  </div>

  <div className="space-y-3">

    {recentInterviews.length > 0 ? (
      recentInterviews.map((interview) => (
        <InterviewRow
          key={interview._id}
          role={interview.jobRole}
          date={new Date(interview.createdAt).toLocaleDateString()}
          score={`${interview.overallScore}%`}
          status={
            interview.status === "Completed"
              ? interview.overallScore >= 80
                ? "Excellent"
                : interview.overallScore >= 60
                ? "Good"
                : "Average"
              : interview.status
          }
        />
      ))
    ) : (
      <div className="py-8 text-center text-gray-400">
        No interviews yet
      </div>
    )}

  </div>

</section>

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <section className="mt-6 rounded-2xl border border-white/10 bg-[#0d0f12] p-6">

            <h2 className="mb-5 text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <button className="group flex items-center gap-5 rounded-xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-transparent p-5 text-left transition hover:border-red-500/40">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                  <Mic />
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold">
                    New Interview
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Start a new AI mock interview
                  </p>

                </div>

                <ArrowUpRight className="text-gray-500 transition group-hover:text-orange-400" />

              </button>


              <button className="group flex items-center gap-5 rounded-xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent p-5 text-left transition hover:border-orange-500/40">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                  <History />
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold">
                    View History
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Check your previous interviews
                  </p>

                </div>

                <ArrowUpRight className="text-gray-500 transition group-hover:text-orange-400" />

              </button>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}


/* ================= COMPONENTS ================= */

function SidebarItem({ icon, text, active }) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-gradient-to-r from-red-500/30 via-orange-500/20 to-transparent text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}

      <span>{text}</span>
    </button>
  );
}


function StatCard({ icon, title, value, change }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-[#0d0f12] p-5 transition hover:border-orange-500/20"
    >

      <div className="mb-5 flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
          {icon}
        </div>

        <span className="text-xs font-medium text-green-400">
          ↑ {change}
        </span>

      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <div className="mt-1 text-3xl font-bold">
        {value}
      </div>

      <p className="mt-1 text-xs text-gray-600">
        vs last month
      </p>

    </motion.div>
  );
}


function InterviewRow({
  role,
  date,
  score,
  status,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-orange-500/20">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
        <Mic size={18} />
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="truncate font-medium">
          {role}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {date} • 45 mins
        </p>

      </div>

      <div className="text-right">

        <p className="font-bold">
          {score}
        </p>

        <p
          className={`text-xs ${
            status === "Excellent"
              ? "text-green-400"
              : status === "Good"
              ? "text-orange-400"
              : "text-yellow-400"
          }`}
        >
          {status}
        </p>

      </div>

      <ChevronRight className="h-4 w-4 text-gray-600" />

    </div>
  );
}

export default Dashboard;