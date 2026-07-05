"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"employee" | "employer">("employer");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, role }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to login");
      }

      toast.success("Logged in successfully! (Mock Dev Mode)");

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
            SmartHire Portal
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name input */}
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
                Continue Access
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
