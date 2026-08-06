import { motion } from "framer-motion";

function AuthCard({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.55,
      }}
      animate={{
        opacity: 1,
        
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 5,
      }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-orange-500/30
        bg-black/35
        p-10
        backdrop-blur-2xl
        shadow-[0_0_70px_rgba(255,120,0,0.18)]
      "
    >
      {/* Top Glow */}

      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400" />

      {children}
    </motion.div>
  );
}

export default AuthCard;