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
        "w-full rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-3 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all duration-300 hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
    >
      {loading ? "Please wait..." : children}
    </motion.button>
  );
}

export default Button;