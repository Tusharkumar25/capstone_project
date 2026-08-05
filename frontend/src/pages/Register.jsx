import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Register() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="w-96 space-y-5">

        <Input
          label="Email"
          placeholder="Enter your email"
        />

        <Button>
          Create Account
        </Button>

      </div>

    </div>
  );
}

export default Register;