import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import google from "../../assets/Images/google.png";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignIn = async () => {
    console.log("SIGN IN CLICKED");

    setErrors({});
    setApiError("");

    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 4) {
      newErrors.password = "Password is too short.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://quorum-backend-1.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // IMPORTANT ROUTE FROM YOUR APP.JSX
      navigate("/organizer/dashboard");

    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email && password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A12] text-white px-3">
      <div className="w-full max-w-md text-center">

        {/* TITLE */}
        <h1 className="text-4xl mt-16 font-semibold">
          Welcome Back
        </h1>

        <p className="text-[#94A3B8] text-base mb-8">
          Sign in to continue voting and tracking your favorites.
        </p>

        {/* API ERROR */}
        {apiError && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {apiError}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-4">

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-12 pl-4 rounded-lg bg-transparent border-2 outline-none
              ${
                errors.email
                  ? "border-red-500"
                  : "border-[#334155] focus:border-purple-500"
              }`}
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-12 pl-4 pr-10 rounded-lg bg-transparent border-2 outline-none
              ${
                errors.password
                  ? "border-red-500"
                  : "border-[#334155] focus:border-purple-500"
              }`}
            />

            {/* TOGGLE PASSWORD */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/60"
            >
              👁
            </span>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <span
              onClick={() => navigate("/reset-password")}
              className="text-yellow-400 underline cursor-pointer"
            >
              Reset Password
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition
              ${
                isFormValid
                  ? "bg-[#7B3FF2] hover:bg-purple-700"
                  : "bg-[#7B3FF2] opacity-50 cursor-not-allowed"
              }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-4">
          <div className="h-px flex-1 bg-gray-600" />
          <span className="text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-600" />
        </div>

        {/* GOOGLE */}
        <button
          onClick={() => navigate("/google")}
          className="w-full py-2 border border-[#7B3FF2] rounded-lg flex items-center justify-center gap-2 hover:bg-white/10"
        >
          <img src={google} alt="google" className="w-6 h-6" />
          Continue with Google
        </button>

        {/* SIGN UP */}
        <p className="text-gray-400 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/sign-up")}
            className="text-yellow-400 underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
