"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"employee" | "employer">("employer");
  const [loading, setLoading] = useState(false);

  // Sync mode with query parameter if present
  useEffect(() => {
    const qMode = searchParams.get("mode");
    if (qMode === "signup" || qMode === "login") {
      setMode(qMode);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    if (mode === "signup" && !name) {
      toast.error("Please enter your full name.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: mode === "signup" ? name : undefined,
          role: mode === "signup" ? role : undefined,
          mode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      toast.success(mode === "login" ? "Logged in successfully!" : "Signed up successfully!");

      // Route depending on role
      router.push("/post-login-handler");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[linear-gradient(to_right,#a5e6a0_0%,#ffffff_80%)] dark:bg-none dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px] px-4 relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-900/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-[32px] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-2xl border border-neutral-200/50 dark:border-neutral-800/50 p-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-800 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent pb-1">
            {mode === "login" ? "SmartHire Log In" : "Create Account"}
          </h2>
          <p className="text-xs text-neutral-500 mt-2">
            {mode === "login" ? "Enter your email to continue your access" : "Register a new profile to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name input (only for signup) */}
          {mode === "signup" && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider pl-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-400">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/70 dark:bg-neutral-900/50 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm dark:text-neutral-200 transition-all duration-200 shadow-sm"
                  required
                />
              </div>
            </div>
          )}

          {/* Email input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider pl-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                placeholder="e.g. john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/70 dark:bg-neutral-900/50 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm dark:text-neutral-200 transition-all duration-200 shadow-sm"
                required
              />
            </div>
          </div>

          {/* Role selection (only for signup) */}
          {mode === "signup" && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider pl-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("employer")}
                  className={cn(
                    "py-2.5 rounded-xl text-xs font-bold border transition-all",
                    role === "employer"
                      ? "bg-green-50 border-green-500 text-green-700 dark:bg-green-950/20 dark:border-green-500 dark:text-green-400"
                      : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  Recruiter / HR
                </button>
                <button
                  type="button"
                  onClick={() => setRole("employee")}
                  className={cn(
                    "py-2.5 rounded-xl text-xs font-bold border transition-all",
                    role === "employee"
                      ? "bg-green-50 border-green-500 text-green-700 dark:bg-green-950/20 dark:border-green-500 dark:text-green-400"
                      : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  Candidate / Job Seeker
                </button>
              </div>
            </div>
          )}

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {mode === "login" ? "Log In" : "Sign Up"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-sm font-semibold text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
          >
            {mode === "login"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-neutral-800 dark:text-neutral-100">Loading auth portal...</div>}>
      <LoginContent />
    </Suspense>
  );
}
