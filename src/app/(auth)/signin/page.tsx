"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/",  
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            toast.success("Signed in successfully!", {
              description: "Redirecting to home page...",
            });
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to sign in. Please check your credentials.");
            setLoading(false);
          },
        }
      );
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Side: Form Section */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-14 lg:px-20">
        <div className="max-w-md w-full mx-auto space-y-8">
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

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              Sign in to manage your car wash bookings and service history.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 h-11 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10235B]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#10235B] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 h-11 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10235B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#10235B] hover:bg-[#193380] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#10235B] hover:text-[#FFC107] transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Banner */}
      <div className="hidden lg:block relative overflow-hidden bg-[#10235B]">
        <img
          src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80"
          alt="Premium Car Wash"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10235B] via-[#10235B]/40 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white space-y-3">
          <span className="inline-block px-3 py-1 bg-[#FFC107] text-[#10235B] text-xs font-bold uppercase tracking-wider rounded-full">
            Premium Care
          </span>
          <h2 className="text-3xl font-bold leading-snug">
            Give Your Car the Showroom Shine It Deserves.
          </h2>
        </div>
      </div>
    </div>
  );
}