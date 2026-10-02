import React, { useState } from "react";
import logo from "../assets/fitness-tracker.png";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [register, {isLoaging}] = useRegisterMutation();
  const [form, setForm] = useState({
    name:"",
    email:"",
    password:"",
    phone:""
  })
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await register({
            name:form.name,
            email:form.email,
            password:form.password,
            phone:form.phone,
        }).unwrap();
        toast.success("User registered");
        navigate('/login');
    } catch (error) {
        console.log(error);
        toast.error(error.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) p-4">
      <div className="w-full max-w-sm rounded-xl text-(--text) p-4 ">
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
              Name
            </label>

            <input
              type="text"
              value={form.name}
              placeholder="Enter your Name"
              className="w-full rounded-lg px-3 py-2 bg-(--surface-input) outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-(--text-secondary)"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-(--text-secondary)">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              placeholder="Enter your email"
              className="w-full rounded-lg px-3 py-2 bg-(--surface-input) outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-(--text-secondary)"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, email: e.target.value }));
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
          {/* <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="flex w-full items-center rounded-lg border focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Re Enter your password"
                className="min-w-0 flex-1 rounded-lg border-0 px-3 py-2 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="px-3 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div> */}
          <div>
            <label className="mb-1 block text-sm font-medium text-(--text-secondary)">
              Phone
            </label>

            <input
              type="text"
              value={form.phone}
              placeholder="Enter your Phone Number"
              className="w-full rounded-lg px-3 py-2 bg-(--surface-input) outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-(--text-secondary)"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, phone: e.target.value }));
              }}
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="rounded-lg bg-(--accent) py-2.5 font-medium text-(--text) transition "
          >
            Register
          </button>
        </form>

        {/* Register */}
        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            className="font-medium text-(--accent) hover:underline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
