"use client";
import { motion } from "framer-motion";
import Navbar from "@/src/app/(Landing-Page)/NavBar";
import Link from "next/link";
import { UploadCloud, Cpu, BarChart3, MessageSquare } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Home() {
  return (
    <div className="bg-transparent text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-transparent dark:bg-transparent">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-center text-green-700 dark:text-green-400 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          AI-Powered{" "}
          <span className="text-green-600 dark:text-green-300">
            Resume Screening
          </span>{" "}
          System
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-center text-gray-700 dark:text-gray-300 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Automate resume parsing, candidate ranking & interview scheduling
          using the power of AI.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/upload-resume">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition">
              Upload Resume
            </button>
          </Link>

        </motion.div>
      </section>

      {/* Smart Hiring Features */}
      <section className="py-28 px-6 bg-transparent transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-700 to-emerald-800 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent pb-3 mb-1">
              Smart Hiring Features
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto text-lg">
              Streamline your recruiter workflow with our comprehensive suite of intelligent candidate screening tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Resume Upload & Parsing",
                desc: "Extracts skills, work experience, projects, and education in seconds. Supports PDF, DOCX, TXT, and JSON formats with advanced parser intelligence.",
                icon: UploadCloud,
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "AI Resume Ranking",
                desc: "Rank resumes automatically based on custom job descriptions. Powered by semantic Cosine Similarity and LangChain-based RAG query response.",
                icon: Cpu,
                color: "from-green-500 to-emerald-500",
              },
              {
                title: "Skill Analytics Dashboard",
                desc: "Gain deep insights into the talent pool. Categorize and filter candidates by technical skillsets with dynamic visual charts powered by Plotly.",
                icon: BarChart3,
                color: "from-purple-500 to-indigo-500",
              },
              {
                title: "Real-Time Chat & Scheduling",
                desc: "Connect recruiters and candidates instantly. Features live chat messaging and direct Google Calendar interview booking coordination.",
                icon: MessageSquare,
                color: "from-amber-500 to-orange-500",
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  className="relative overflow-hidden bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 p-8 rounded-3xl shadow-lg transition-all duration-300 group hover:shadow-2xl hover:border-green-300 dark:hover:border-green-500/40"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  {/* Subtle background glow on hover */}
                  <div className="absolute -inset-px bg-gradient-to-br from-transparent via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />

                  {/* Icon with colored gradient ring */}
                  <div className={cn(
                    "mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br text-white shadow-md group-hover:scale-110 transition-transform duration-300",
                    f.color
                  )}>
                    <Icon size={24} strokeWidth={2} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upload Resume CTA */}
      <section className="py-20 px-6 bg-green-50/20 dark:bg-gray-800/40 backdrop-blur-sm text-center">
        <motion.h2
          className="text-4xl font-bold text-green-800 dark:text-green-300 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Upload Your Resume?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let our AI analyze your resume, extract key skills, and rank it
          smartly.
        </motion.p>

        <Link href="/upload-resume">
          <motion.button
            className="bg-green-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-green-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Now
          </motion.button>
        </Link>
      </section>


      {/* Final CTA */}
      <motion.section
        className="py-24 bg-green-600 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hire Smarter with AI.
        </motion.h2>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Save time, reduce bias, and focus on the right talent.
        </motion.p>
        <Link href="/upload-resume">
          <motion.button
            className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Now
          </motion.button>
        </Link>
      </motion.section>

    </div>
  );
}
