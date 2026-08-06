import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});




function LoginForm() {

const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: zodResolver(loginSchema),
});


async function onSubmit(data) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      data,
      {
        withCredentials: true,
      }
    );

    toast.success(response.data.message);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Login failed"
    );
  }
}

  return (

    <form
  onSubmit={handleSubmit(onSubmit)}
  className="mt-10 space-y-5"
>

<Input
  label="Email"
  placeholder="Enter your email"
  error={errors.email?.message}
  {...register("email")}
/>

      <div className="relative">

        <Input
  label="Password"
  type={showPassword ? "text" : "password"}
  placeholder="Enter your password"
  error={errors.password?.message}
  {...register("password")}
/>

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[46px] text-gray-400 hover:text-orange-400"
        >
          {
            showPassword
              ? <EyeOff size={20}/>
              : <Eye size={20}/>
          }

        </button>

      </div>

   <Button
  type="submit"
  loading={isSubmitting}
>
  Login
</Button>

    </form>

  );
}

export default LoginForm;