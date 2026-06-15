import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import google from "../../assets/Images/google.png"

export default function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
 
  const strength = getPasswordStrength(password);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordStrength = (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (!val) return "";
    if (score <= 1) return "Weak";
    if (score <= 3) return "Medium";
    return "Strong";
  };

  const handleSignUp = async () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

try {
  const response = await axios.post(
    "https://quorum-backend-1.onrender.com/auth/register",
    {
      name: fullName,
      email: email,
      password: password,
    }
  );

  setSuccess("Account created successfully!");

  setTimeout(() => {
    navigate("/sign-in");
  }, 2000);

} catch (error) {
    setErrors({
      api: error.response?.data?.message || "Registration failed",
    });
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A12] text-white px-3">
      <div className="w-full max-w-md text-center">
        {/* TITLE */}
        <h1 className="text-4xl font-semibold mb-3">
          Create Your <br /> Voting Account
        </h1>

        <p className="text-[#94A3B8] text-base mb-8">
          Join the competition and start <br />
          supporting nominees instantly.
        </p>
          {errors.api && (
   <div className="mb-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
    {errors.api}
  </div>
   )}
        {/* SUCCESS */}
        {success && (
          <div className="mb-4 p-3 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 text-sm">
            {success}
          </div>
        )}

        <div className="space-y-3">
          {/* FULL NAME */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full h-12 px-4 rounded-lg bg-transparent border-2 outline-none
              ${errors.fullName ? "border-red-500" : "border-[#334155] focus:border-purple-500"}`}
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-12 px-4 rounded-lg bg-transparent border-2 outline-none
              ${errors.email ? "border-red-500" : "border-[#334155] focus:border-purple-500"}`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-12 px-4 pr-10 rounded-lg bg-transparent border-2 outline-none
              ${errors.password ? "border-red-500" : "border-[#334155] focus:border-purple-500"}`}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/60"
            >
              {showPassword ? (
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 30 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6502 2.66368C17.0991 2.65554 19.5006 3.33863 21.5786 4.63443C23.6566 5.93024 25.3268 7.78614 26.397 9.98879C24.1995 14.4771 19.7112 17.3139 14.6502 17.3139C9.58924 17.3139 5.10094 14.4771 2.90341 9.98879C3.9737 7.78614 5.64384 5.93024 7.72184 4.63443C9.79984 3.33863 12.2013 2.65554 14.6502 2.66368ZM14.6502 0C7.99103 0 2.30408 4.14202 0 9.98879C2.30408 15.8356 7.99103 19.9776 14.6502 19.9776C21.3094 19.9776 26.9964 15.8356 29.3005 9.98879C26.9964 4.14202 21.3094 0 14.6502 0ZM14.6502 6.65919C15.5333 6.65919 16.3802 7.00999 17.0046 7.63441C17.629 8.25883 17.9798 9.10573 17.9798 9.98879C17.9798 10.8719 17.629 11.7188 17.0046 12.3432C16.3802 12.9676 15.5333 13.3184 14.6502 13.3184C13.7672 13.3184 12.9203 12.9676 12.2958 12.3432C11.6714 11.7188 11.3206 10.8719 11.3206 9.98879C11.3206 9.10573 11.6714 8.25883 12.2958 7.63441C12.9203 7.00999 13.7672 6.65919 14.6502 6.65919ZM14.6502 3.99552C11.3473 3.99552 8.65695 6.68583 8.65695 9.98879C8.65695 13.2918 11.3473 15.9821 14.6502 15.9821C17.9532 15.9821 20.6435 13.2918 20.6435 9.98879C20.6435 6.68583 17.9532 3.99552 14.6502 3.99552Z"
                    fill="#94A3B8"
                  />
                </svg>
              ) : (
                <svg
                  width="26"
                  height="18"
                  viewBox="0 0 30 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6502 2.66368C17.0991 2.65554 19.5006 3.33863 21.5786 4.63443C23.6566 5.93024 25.3268 7.78614 26.397 9.98879C24.1995 14.4771 19.7112 17.3139 14.6502 17.3139C9.58924 17.3139 5.10094 14.4771 2.90341 9.98879C3.9737 7.78614 5.64384 5.93024 7.72184 4.63443C9.79984 3.33863 12.2013 2.65554 14.6502 2.66368ZM14.6502 0C7.99103 0 2.30408 4.14202 0 9.98879C2.30408 15.8356 7.99103 19.9776 14.6502 19.9776C21.3094 19.9776 26.9964 15.8356 29.3005 9.98879C26.9964 4.14202 21.3094 0 14.6502 0ZM14.6502 6.65919C15.5333 6.65919 16.3802 7.00999 17.0046 7.63441C17.629 8.25883 17.9798 9.10573 17.9798 9.98879C17.9798 10.8719 17.629 11.7188 17.0046 12.3432C16.3802 12.9676 15.5333 13.3184 14.6502 13.3184C13.7672 13.3184 12.9203 12.9676 12.2958 12.3432C11.6714 11.7188 11.3206 10.8719 11.3206 9.98879C11.3206 9.10573 11.6714 8.25883 12.2958 7.63441C12.9203 7.00999 13.7672 6.65919 14.6502 6.65919ZM14.6502 3.99552C11.3473 3.99552 8.65695 6.68583 8.65695 9.98879C8.65695 13.2918 11.3473 15.9821 14.6502 15.9821C17.9532 15.9821 20.6435 13.2918 20.6435 9.98879C20.6435 6.68583 17.9532 3.99552 14.6502 3.99552Z"
                    fill="#94A3B8"
                  />
                </svg>
              )}
            </span>

            {password && (
              <p
                className={`text-sm mt-1 ${
                  strength === "Weak"
                    ? "text-red-400"
                    : strength === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                }`}
              >
                {strength} password
              </p>
            )}

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full h-12 px-4 pr-10 rounded-lg bg-transparent border-2 outline-none
              ${errors.confirmPassword ? "border-red-500" : "border-[#334155] focus:border-purple-500"}`}
            />

            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/60"
            >
              {showConfirmPassword ? (
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 30 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6502 2.66368C17.0991 2.65554 19.5006 3.33863 21.5786 4.63443C23.6566 5.93024 25.3268 7.78614 26.397 9.98879C24.1995 14.4771 19.7112 17.3139 14.6502 17.3139C9.58924 17.3139 5.10094 14.4771 2.90341 9.98879C3.9737 7.78614 5.64384 5.93024 7.72184 4.63443C9.79984 3.33863 12.2013 2.65554 14.6502 2.66368ZM14.6502 0C7.99103 0 2.30408 4.14202 0 9.98879C2.30408 15.8356 7.99103 19.9776 14.6502 19.9776C21.3094 19.9776 26.9964 15.8356 29.3005 9.98879C26.9964 4.14202 21.3094 0 14.6502 0ZM14.6502 6.65919C15.5333 6.65919 16.3802 7.00999 17.0046 7.63441C17.629 8.25883 17.9798 9.10573 17.9798 9.98879C17.9798 10.8719 17.629 11.7188 17.0046 12.3432C16.3802 12.9676 15.5333 13.3184 14.6502 13.3184C13.7672 13.3184 12.9203 12.9676 12.2958 12.3432C11.6714 11.7188 11.3206 10.8719 11.3206 9.98879C11.3206 9.10573 11.6714 8.25883 12.2958 7.63441C12.9203 7.00999 13.7672 6.65919 14.6502 6.65919ZM14.6502 3.99552C11.3473 3.99552 8.65695 6.68583 8.65695 9.98879C8.65695 13.2918 11.3473 15.9821 14.6502 15.9821C17.9532 15.9821 20.6435 13.2918 20.6435 9.98879C20.6435 6.68583 17.9532 3.99552 14.6502 3.99552Z"
                    fill="#94A3B8"
                  />
                </svg>
              ) : (
                <svg
                  width="26"
                  height="18"
                  viewBox="0 0 30 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6502 2.66368C17.0991 2.65554 19.5006 3.33863 21.5786 4.63443C23.6566 5.93024 25.3268 7.78614 26.397 9.98879C24.1995 14.4771 19.7112 17.3139 14.6502 17.3139C9.58924 17.3139 5.10094 14.4771 2.90341 9.98879C3.9737 7.78614 5.64384 5.93024 7.72184 4.63443C9.79984 3.33863 12.2013 2.65554 14.6502 2.66368ZM14.6502 0C7.99103 0 2.30408 4.14202 0 9.98879C2.30408 15.8356 7.99103 19.9776 14.6502 19.9776C21.3094 19.9776 26.9964 15.8356 29.3005 9.98879C26.9964 4.14202 21.3094 0 14.6502 0ZM14.6502 6.65919C15.5333 6.65919 16.3802 7.00999 17.0046 7.63441C17.629 8.25883 17.9798 9.10573 17.9798 9.98879C17.9798 10.8719 17.629 11.7188 17.0046 12.3432C16.3802 12.9676 15.5333 13.3184 14.6502 13.3184C13.7672 13.3184 12.9203 12.9676 12.2958 12.3432C11.6714 11.7188 11.3206 10.8719 11.3206 9.98879C11.3206 9.10573 11.6714 8.25883 12.2958 7.63441C12.9203 7.00999 13.7672 6.65919 14.6502 6.65919ZM14.6502 3.99552C11.3473 3.99552 8.65695 6.68583 8.65695 9.98879C8.65695 13.2918 11.3473 15.9821 14.6502 15.9821C17.9532 15.9821 20.6435 13.2918 20.6435 9.98879C20.6435 6.68583 17.9532 3.99552 14.6502 3.99552Z"
                    fill="#94A3B8"
                  />
                </svg>
              )}
            </span>

            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full mt-6 h-12 rounded-lg bg-[#7B3FF2] hover:bg-purple-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          
           {/* DIVIDER */}
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-[#94A3B8]" />
          <span className="text-white/50 text-base">Or</span>
          <div className="h-px flex-1 bg-[#94A3B8]" />
        </div>

          {/* GOOGLE */}
          <button className="w-full text-lg h-12 border border-[#7B3FF2] rounded-lg flex items-center justify-center gap-3 hover:bg-white/25 transition">
            <img src={google} className="w-7 h-7" />
            Continue with Google
          </button>

          {/* SIGN IN LINK */}
          <p className="text-gray-400 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/sign-in")}
              className="text-yellow-400 underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
