"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mail, CreditCard, Sun, Moon } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ShinyButton } from "@/src/components/magicui/shiny-button";
import { ShimmerButton } from "@/src/components/magicui/shimmer-button";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Contact Us", url: "/contact", icon: Mail },
  { name: "Pricing", url: "/billing", icon: CreditCard },
];

function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      {/* Background image / radial gradient */}
      <div className="fixed inset-0 -z-10 pointer-events-none transition-all duration-150">
        <div className="absolute inset-0 transition-all duration-150 bg-[linear-gradient(to_right,#a5e6a0_0%,#ffffff_80%)] dark:bg-none dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]"></div>
      </div>

      {/* Floating Tubelight Navbar Container (Longer) */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-11/12 md:w-10/12 max-w-6xl">
        <div className="flex justify-between items-center bg-white/90 dark:bg-black/90 border border-neutral-200 dark:border-neutral-800 backdrop-blur-lg py-2 px-6 rounded-full shadow-lg">
          
          {/* Left: Brand Logo/Name */}
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
              <span className="font-extrabold text-2xl md:text-3xl tracking-wide bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent block">
                HireSense
              </span>
            </Link>
          </div>

          {/* Center: Tubelight-style Nav Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;

              return (
                <Link
                  key={item.name}
                  href={item.url}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 sm:px-5 py-2 rounded-full transition-colors duration-300",
                    "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50",
                    isActive && "text-neutral-900 dark:text-neutral-50"
                  )}
                >
                  <span className="hidden sm:inline">{item.name}</span>
                  <span className="sm:hidden">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-neutral-950 dark:bg-neutral-50 rounded-full">
                        {/* Glow effect */}
                        <div className="absolute w-8 h-4 bg-neutral-950/20 dark:bg-neutral-50/20 rounded-full blur-sm -top-1 -left-1" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Theme Toggle & Login/Signup Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Login & Sign Up Buttons */}
            <div className="flex items-center gap-2">
              <Link href="/login">
                <ShinyButton className="px-4 py-1.5 text-xs sm:text-sm">Login</ShinyButton>
              </Link>
              <Link href="/login">
                <ShimmerButton className="px-4 py-1.5 text-xs sm:text-sm">Sign Up</ShimmerButton>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;
