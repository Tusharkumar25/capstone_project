import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

function LoginHeader() {
  return (
    <>
      {/* Animated Logo */}

      <div className="relative flex justify-center">

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute h-24 w-24 rounded-full bg-orange-500/30 blur-3xl"
        />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 shadow-2xl shadow-orange-500/30">

          <BrainCircuit className="h-10 w-10 text-black" />

        </div>

      </div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .2 }}
        className="mt-7 text-center text-4xl font-bold text-white"
      >
        AI Mock Interview
      </motion.h1>

      <p className="mt-3 text-center text-gray-300">
        Practice. Improve. Succeed.
      </p>
    </>
  );
}

export default LoginHeader;