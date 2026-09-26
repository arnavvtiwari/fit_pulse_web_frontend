import React, { useState } from "react";
import logo from "../assets/fitness-tracker.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../features/auth/authApi";

const Login = () => {
  const [login, {isLoading}, status, error] = useLoginMutation();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login({
        email : form.email,
        password : form.password,
      }).unwrap();
      toast.success("Logged in")
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.username);

      navigate("/workouts");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) p-4">
      <div className="w-full max-w-sm text-(--text) p-4">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <img
            src={logo}
            alt="Fit Pulse"
            className="mb-2 h-20 w-20 object-contain"
          />

          <h1 className="text-2xl font-bold">FIT PULSE</h1>

          <p className="text-sm text-gray-500">Track Your Progress</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-(--text-secondary)">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              placeholder="Enter your email"
              className="w-full rounded-lg bg-(--surface-input) px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-(--text-secondary)">
              Password
            </label>

            <div className="flex w-full items-center rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100  bg-(--surface-input)">
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                placeholder="Enter your password"
                className="min-w-0 flex-1 rounded-lg border-0 px-3 py-2 outline-none placeholder:text-(--text-secondary)"
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />

              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="px-3 text-sm font-medium text-(--text-secondary)"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-(--accent) py-2.5 font-medium text-white transition"
          >
            {isLoading ? "Logging in ...." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p className="mt-5 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            className="font-medium text-(--accent) hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
