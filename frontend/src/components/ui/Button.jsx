import { motion } from "framer-motion";
import clsx from "clsx";

function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "w-full rounded-xl bg-blue-600 py-3 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
    >
      {loading ? "Please wait..." : children}
    </motion.button>
  );
}

export default Button;