import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) signup(formData);
  };

  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-cover bg-center flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/85 backdrop-blur-sm shadow-xl rounded-xl p-8 mt-10 sm:p-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <MessageSquare className="w-9 h-9 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-blue-950">Create Account</h1>
          <p className="text-sm text-gray-600">Get started with your free account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
            <User className="text-gray-500 h-5 w-5 mr-2" />
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-white text-black outline-none"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
            <Mail className="text-gray-500 h-5 w-5 mr-2" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-white text-black outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
            <Lock className="text-gray-600 h-5 w-5 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-white text-black outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="ml-2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
