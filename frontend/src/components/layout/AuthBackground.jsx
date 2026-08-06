import { motion } from "framer-motion";
import background from "../../assets/login-bg.png";

function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <motion.img
        src={background}
        alt="background"
        initial={{ scale: 1.4 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 8,
        }}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-r from-orange-950/20 via-transparent to-red-950/20" />

    </div>
  );
}

export default AuthBackground;