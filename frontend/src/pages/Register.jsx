import Logo from "../components/common/Logo";
import RegisterForm from "../components/auth/RegisterForm";
import FeatureCard from "../components/auth/FeatureCard";
import { motion } from "framer-motion";

import {
  BrainCircuit,
  MessageSquareText,
  ChartColumn,
} from "lucide-react";

function Register() {
  return (






    <div className="relative min-h-screen overflow-hidden bg-gray-500">

{/* Grid Background */}
<div
  className="absolute inset-0 opacity-10"
  style={{
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
    `,
    backgroundSize: "45px 45px",
  }}
/>

{/* Floating Particles */}
{/* Floating Bubble 1 */}

<motion.div
  animate={{
    y: [-30, 30, -30],
    x: [-10, 15, -10],
    rotate: [0, 8, 0],
  }}
  transition={{
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute top-24 left-20 h-24 w-24 rounded-full border border-white/20 bg-white/10 backdrop-blur-2xl shadow-xl"
/>

{/* Bubble 2 */}

<motion.div
  animate={{
    y: [20, -20, 20],
    x: [10, -10, 10],
    rotate: [0, -10, 0],
  }}
  transition={{
    duration: 15,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute top-72 left-[32%] h-16 w-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg"
/>

{/* Bubble 3 */}

<motion.div
  animate={{
    y: [-25, 25, -25],
    rotate: [0, 15, 0],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute bottom-28 left-28 h-32 w-32 rounded-full border border-white/20 bg-white/10 backdrop-blur-3xl shadow-2xl"
/>

{/* Bubble 4 */}

<motion.div
  animate={{
    y: [25, -25, 25],
    x: [0, 20, 0],
  }}
  transition={{
    duration: 14,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute right-24 top-36 h-20 w-20 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl"
/>

{/* Bubble 5 */}

<motion.div
  animate={{
    y: [-35, 35, -35],
    rotate: [0, -12, 0],
  }}
  transition={{
    duration: 18,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute bottom-16 right-36 h-28 w-28 rounded-full border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl"
/>

      {/* Background Blur */}
  
      <motion.div
  animate={{
    x: [-20, 20, -20],
    y: [-10, 10, -10],
  }}
  transition={{
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-600/40 blur-[140px]"
/>

      <motion.div
  animate={{
    x: [20, -20, 20],
    y: [10, -10, 10],
  }}
  transition={{
    duration: 15,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-600/40 blur-[150px]"
/>

      <motion.div
  animate={{
    y: [-20, 20, -20],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-yellow-500/20 blur-[130px]"
/>







    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-8, 8, -8] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute left-10 top-8 z-50  mb-12 flex justify-center"
    >
      <div className="absolute h-72 w-72 rounded-full bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 blur-3xl"></div>

      <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
        <BrainCircuit className="h-20 w-20 text-orange-400" />
      </div>
    </motion.div>



      

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="grid w-full items-center gap-20 lg:grid-cols-2">
          {/* LEFT SECTION */}

          <div className="hidden lg:flex flex-col justify-center">
            <div className="max-w-xl">

    {/* Floating Hero Icon */}



              {/* Badge */}



              {/* Heading */}

<motion.h1
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 3, delay: 0.5 }}
  className="mt-1 text-6xl font-extrabold leading-tight text-black"
>
  Crack Your
  <br />

  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
    Dream Interview
  </span>
</motion.h1>

              {/* Description */}

              <p className="mt-4 text-lg leading-8 text-gray-300">
                Practice real-world interviews with AI-generated
                questions, receive detailed feedback, identify your
                weaknesses, and walk into every interview with
                confidence.
              </p>

              {/* Feature Cards */}

              <div className="mt-7 space-y-3">
                <FeatureCard
                delay={1}
                  icon={<BrainCircuit className="h-6 w-6 text-white" />}
                  title="AI Generated Questions"
                  description="Interview questions generated according to your role, experience and technology."
                />

                <FeatureCard
                delay={1.6}
                  icon={
                    <MessageSquareText className="h-6 w-6 text-white" />
                  }
                  title="Instant AI Feedback"
                  description="Receive detailed evaluation, score and personalized suggestions after every interview."
                />

                <FeatureCard
                delay={2}
                  icon={<ChartColumn className="h-6 w-6 text-white" />}
                  title="Performance Analytics"
                  description="Track your strengths, weaknesses and continuously improve your interview performance."
                />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}

          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/8 p-8 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
              <Logo />

              <div className="mt-10">
                <h2 className="text-3xl font-bold text-white">
                  Create Account
                </h2>

                <p className="mt-2 text-gray-400">
                  Start your AI interview journey today.
                </p>
              </div>

              <div className="mt-8">
                <RegisterForm />
              </div>

              <p className="mt-8 text-center text-gray-400">
                Already have an account?
                <span className="ml-2 cursor-pointer font-semibold text-orange-400 hover:text-orange-300">
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;