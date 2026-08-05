import { motion } from "framer-motion";
function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}) {
  return (
<motion.div
  initial={{
    opacity: 0,
    y: 10,
  }}
  animate={{
    opacity: 1,
    y: [0, -30, 0],
    rotate: [-0.5, 0.5, -0.5],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  }}
  whileHover={{
    scale: 1.05,
    y: -12,
    transition: {
      duration: 0.2,
    },
  }}
  className="flex items-start gap-4 rounded-2xl border border-white/20 bg-gray-400/20 p-5 backdrop-blur-xl transition-all duration-300 hover:border-orange-400/40 hover:shadow-2xl hover:shadow-orange-500/20"
>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-black">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default FeatureCard;