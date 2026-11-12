"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";  

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Smart Password Validation Rules
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasNumber;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!hasMinLength) {
      const msg = "Password must be at least 8 characters long.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!isPasswordValid) {
      const msg = "Please include at least 1 uppercase letter and 1 number.";
      setError(msg);
      toast.error(msg);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const image = formData.get("profileImage") as string;
    const validPassword = formData.get("password") as string;

    setLoading(true);

    try {
      // Better Auth SignUp Email Client Call
      const { data, error } = await authClient.signUp.email(
        {
          email,  
          password: validPassword,  
          name,  
          image: image || undefined,  
          callbackURL: "/signin",  
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            toast.success(`Account created successfully for ${name}!`, {
              description: "Redirecting to your dashboard...",
            });
            setTimeout(() => {
              router.push("/signin");
            }, 1000);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to sign up. Try again.");
            setLoading(false);
          },
        }
      );
      console.log(data, error)

      if (error) {
        toast.error(error.message || "Something went wrong.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Side: Banner */}
      <div className="hidden lg:block relative overflow-hidden bg-[#10235B]">
        <img
          src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80"
          alt="Foam Car Wash"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10235B] via-[#10235B]/40 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white space-y-3">
          <span className="inline-block px-3 py-1 bg-[#FFC107] text-[#10235B] text-xs font-bold uppercase tracking-wider rounded-full">
            Join Today
          </span>
          <h2 className="text-3xl font-bold leading-snug">
            Fast, Eco-Friendly & Professional Car Detailing.
          </h2>
          <p className="text-sm text-gray-200 max-w-md">
            Create an account to unlock member discounts, priority booking slots, and package comparisons.
          </p>
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-14 lg:px-20">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-[#10235B] flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-[#FFC107]" />
              </div>
              <span className="text-xl font-bold text-[#10235B] tracking-tight">
                AutoGlow Wash
              </span>
            </Link>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h1>
            <p className="text-sm text-gray-500">
              Enter your details below to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-10 pr-4 h-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10235B]"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 h-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10235B]"
                />
              </div>
            </div>

            {/* Profile Image URL */}
            <div>
              <label
                htmlFor="profileImage"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Profile Image URL (Optional)
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  id="profileImage"
                  name="profileImage"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-10 pr-4 h-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10235B]"
                />
              </div>
            </div>

            {/* Password with Live Validation */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Minimum 8 characters"
                  required
                  className={`w-full pl-10 pr-10 h-10 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                    error
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-[#10235B]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Live Smart Validation Checklist */}
              {password.length > 0 && (
                <div className="mt-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-100 space-y-1.5 text-xs">
                  <div
                    className={`flex items-center gap-2 transition-colors ${
                      hasMinLength ? "text-emerald-600 font-medium" : "text-gray-500"
                    }`}
                  >
                    {hasMinLength ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>At least 8 characters</span>
                  </div>

                  <div
                    className={`flex items-center gap-2 transition-colors ${
                      hasUpperCase ? "text-emerald-600 font-medium" : "text-gray-500"
                    }`}
                  >
                    {hasUpperCase ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>One uppercase letter (A-Z)</span>
                  </div>

                  <div
                    className={`flex items-center gap-2 transition-colors ${
                      hasNumber ? "text-emerald-600 font-medium" : "text-gray-500"
                    }`}
                  >
                    {hasNumber ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>One number (0-9)</span>
                  </div>
                </div>
              )}

              {/* Error Alert Message */}
              {error && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#FFC107] hover:bg-[#eab000] text-[#10235B] font-bold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer mt-3 shadow-sm disabled:opacity-50"
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#10235B] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}