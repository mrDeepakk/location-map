import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const nav = useNavigate();
  const { status, error } = useSelector((s) => s.auth);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const res = await dispatch(registerUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Account created successfully! Redirecting...");
      setTimeout(() => nav("/map"), 1500);
    } else {
      toast.error(error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] relative overflow-hidden">
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Floating glowing shapes */}
      <div className="absolute w-64 h-64 bg-blue-600 rounded-full opacity-20 blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-700 rounded-full opacity-20 blur-3xl bottom-10 right-10 animate-pulse delay-2000"></div>

      {/* Register Card */}
      <form
        onSubmit={submit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-96 z-10 transform transition-all hover:scale-[1.02]"
      >
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Create Account
        </h1>

        {error && <p className="text-red-400 mb-3 text-center">{error}</p>}

        <input
          className="w-full bg-white/5 text-white border border-white/20 p-3 rounded-lg mb-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full bg-white/5 text-white border border-white/20 p-3 rounded-lg mb-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full bg-white/5 text-white border border-white/20 p-3 rounded-lg mb-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          className="w-full bg-white/5 text-white border border-white/20 p-3 rounded-lg mb-6 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button
          disabled={status === "loading"}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-70"
        >
          {status === "loading" ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-gray-300 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
