import AuthBackground from "../components/layout/AuthBackground";
import AuthCard from "../components/layout/AuthCard";

import LoginHeader from "../components/auth/LoginHeader";
import LoginForm from "../components/auth/LoginForm";
import LoginFooter from "../components/auth/LoginFooter";

import { motion } from "framer-motion";

function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            

      <AuthBackground />

      



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
  className="absolute top-24 left-20 h-24 w-24 rounded-full border border-orange-300/20 bg-red/50 backdrop-blur-3.5xl shadow-xl"
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
  className="absolute top-72 left-[32%] h-20 w-20 rounded-full border border-orange-300/20 bg-red/50 backdrop-blur-3.5xl shadow-lg"
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
  className="absolute bottom-28 left-24 h-32 w-32 rounded-full border border-orange-300/20 bg-red/50 backdrop-blur-3.5xl shadow-2xl"
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
  className="absolute right-24 top-36 h-20 w-20 rounded-full border border-orange-300/20 bg-red/50 backdrop-blur-3.5xl shadow-xl"
/>

{/* Bubble 5 */}

<motion.div
  animate={{
    x: [-35, 35, -35],
    y: [-35, 35, -35],
    rotate: [0, -12, 0],
  }}
  transition={{
    duration: 15,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute bottom-16 right-36 h-28 w-28 rounded-full border border-red-300/20 bg-red/50 backdrop-blur-3.5xl shadow-2xl"
/>



<motion.div
  animate={{
    x: [-35, 35, -35],
    y: [-35, 35, -35],
    rotate: [0, -12, 0],
  }}
  transition={{
    duration: 19,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute top-16 right-30 h-28 w-28 rounded-full border border-red-300/20 bg-red/50 backdrop-blur-3.5xl shadow-2xl"
/>







      <div className="relative z-10 w-full px-6">

        <div className="mx-auto max-w-md">

          <AuthCard>

            <LoginHeader />

            <LoginForm />

            <LoginFooter />

          </AuthCard>

        </div>

      </div>

    </div>
  );
}

export default Login;