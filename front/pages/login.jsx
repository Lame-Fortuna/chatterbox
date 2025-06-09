import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const Login = () => {
  useEffect(() => {
    document.title = "Chat on Chatterbox";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-cover bg-center flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/85 backdrop-blur-sm shadow-xl rounded-xl p-8 sm:p-10 mt-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <MessageSquare className="w-9 h-9 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-blue-950">Welcome Back</h1>
          <p className="text-sm text-gray-600">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
            <Mail className="text-gray-500 h-5 w-5 mr-2" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full bg-white text-black outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
            <Lock className="text-gray-600 h-5 w-5 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full bg-white text-black outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="ml-2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
