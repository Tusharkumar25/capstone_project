import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3 select-none"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 shadow-lg shadow-orange-500/30">
        <BrainCircuit className="h-7 w-7 text-white" />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-wide text-white">
          JOBIFY AI
        </h1>

        <p className="text-xs text-gray-400">
          AI Mock Interview Platform
        </p>
      </div>
    </Link>
  );
}

export default Logo;