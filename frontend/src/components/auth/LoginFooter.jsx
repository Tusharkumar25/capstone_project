import { ShieldCheck } from "lucide-react";

function LoginFooter() {
  return (
    <>
      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-gray-700" />

        <span className="mx-4 text-sm text-gray-400">
          Welcome Back!
        </span>

        <div className="h-px flex-1 bg-gray-700" />

      </div>

      <div className="flex items-center justify-center gap-2 text-gray-400">

        <ShieldCheck className="h-5 w-5 text-green-400" />

        <span className="text-sm">
          Your data is secure with us
        </span>

      </div>
    </>
  );
}

export default LoginFooter;