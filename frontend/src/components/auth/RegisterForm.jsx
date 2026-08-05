import Input from "../ui/Input";
import Button from "../ui/Button";

function RegisterForm() {
  return (
    <form className="space-y-5">

      <Input
        label="Full Name"
        placeholder="Enter your full name"
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <Button type="submit">
        Create Account
      </Button>

    </form>
  );
}

export default RegisterForm;