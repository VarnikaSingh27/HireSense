"use client";
import { useState } from "react";
import Navbar from "@/src/app/(Landing-Page)/NavBar";
import { Phone, MessageSquare, Heart, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    country: "India",
    department: "Support",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-28 px-4 mb-12">
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 max-w-5xl w-full border border-neutral-200/50 dark:border-neutral-800/50">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-green-700 to-emerald-800 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent pb-2">
            How would you like to contact HireSense?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Contact Form */}
            <div className="p-6 md:p-8 bg-neutral-50/50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800/60 shadow-inner rounded-3xl w-full max-w-md">
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2 mb-1">
                <Sparkles className="text-green-600 dark:text-green-400 w-5 h-5" />
                Request a call
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
                Give us some info so the right person can get back to you.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border p-3 rounded-xl w-full text-sm bg-white/70 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 shadow-sm"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border p-3 rounded-xl w-full text-sm bg-white/70 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 shadow-sm"
                />
              </div>
              <input
                type="text"
                name="jobTitle"
                placeholder="Job title"
                value={formData.jobTitle}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full text-sm mt-3 bg-white/70 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 shadow-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full text-sm mt-3 bg-white/70 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 shadow-sm"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full text-sm mt-3 bg-white/70 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 shadow-sm"
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full text-sm mt-3 bg-white/70 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 shadow-sm"
              >
                <option>United States</option>
                <option>India</option>
                <option>United Kingdom</option>
              </select>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full text-sm mt-3 bg-white/70 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 shadow-sm"
              >
                <option>Sales</option>
                <option>Support</option>
              </select>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">
                By registering, you agree to the processing of your personal
                data as described in the Privacy Statement.
              </p>
              <button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold w-full py-3 rounded-full mt-5 shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-0.5 transition-all duration-300">
                CONTACT ME
              </button>
            </div>

            {/* Right: Contact Options */}
            <div className="flex flex-col gap-6">
              {/* Option 1: Phone */}
              <div className="bg-neutral-50/50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800/60 shadow-md rounded-3xl p-6 hover:shadow-xl hover:border-green-200 dark:hover:border-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 flex items-center gap-2 mb-2">
                  <Phone className="text-green-600 dark:text-green-400 w-5 h-5" />
                  Give us a call
                </h3>
                <p className="text-2xl font-black text-green-700 dark:text-green-400 my-1">
                  +91-123456789
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Not in India?{" "}
                  <a
                    href="#"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline font-medium"
                  >
                    Find your local office
                  </a>
                </p>
              </div>

              {/* Option 2: Live Chat */}
              <div className="bg-neutral-50/50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800/60 shadow-md rounded-3xl p-6 hover:shadow-xl hover:border-green-200 dark:hover:border-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 flex items-center gap-2 mb-2">
                  <MessageSquare className="text-green-600 dark:text-green-400 w-5 h-5" />
                  Chat with us
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Get product info, login help, and live chat with an agent.
                </p>
                <button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white text-sm font-bold w-full py-2.5 rounded-full mt-4 shadow-md hover:shadow-green-500/10 transform hover:-translate-y-0.5 transition-all duration-300">
                  LET'S CHAT
                </button>
              </div>

              {/* Option 3: Feedback */}
              <div className="bg-neutral-50/50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800/60 shadow-md rounded-3xl p-6 hover:shadow-xl hover:border-green-200 dark:hover:border-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 flex items-center gap-2 mb-2">
                  <Heart className="text-green-600 dark:text-green-400 w-5 h-5" />
                  Leave us some feedback
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Good or bad, we love to hear it all. Help us improve HireSense!
                </p>
                <button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white text-sm font-bold w-full py-2.5 rounded-full mt-4 shadow-md hover:shadow-green-500/10 transform hover:-translate-y-0.5 transition-all duration-300">
                  SEND FEEDBACK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
