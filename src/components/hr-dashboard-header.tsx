"use client";
import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

export function DashboardHeader() {
  const [date, setDate] = useState<Date | undefined>(); // Temporary date selection
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(); // Confirmed interview date
  const [time, setTime] = useState<Date | null>(null);

  // Set the time on the client side only to avoid server-side hydration mismatch
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* Background decorative element - Purple as primary theme */}
      <div className="absolute -top-10 right-0 w-64 h-64 bg-purple-200/20 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
      
      <div className="px-8 py-6 bg-white/70 dark:bg-neutral-900/40 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/60 shadow-xl rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section - Primary brand color (purple) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 w-full md:w-auto">
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 pl-0.5">
              Welcome back
            </p>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-700 to-indigo-800 dark:from-purple-400 dark:to-indigo-500 bg-clip-text text-transparent pb-0.5">
              HR Dashboard
            </h1>
          </div>
          
          <div className="text-center sm:text-left bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-neutral-950/40 dark:to-neutral-900/40 px-5 py-3 rounded-2xl border border-green-100/50 dark:border-neutral-800/50 w-full sm:w-auto shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400 mb-0.5">
              Current Date & Time
            </p>
            <p className="text-sm md:text-base font-semibold text-neutral-850 dark:text-neutral-200">
              {time ? format(time, "PP p") : "Loading..."}
            </p>
          </div>
        </div>

        {/* Right Section - Secondary actions with green as accent */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center sm:justify-end">

          
          {/* Interview Scheduler */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "md:min-w-[220px] flex items-center justify-between text-left font-semibold px-5 py-2.5 bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-full hover:border-green-400 hover:shadow-lg dark:hover:border-green-600/50 transition-all duration-300 transform hover:-translate-y-0.5",
                  !selectedDate && "text-neutral-500 dark:text-neutral-400",
                )}
              >
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <span className="text-sm font-semibold truncate">
                    {selectedDate
                      ? format(selectedDate, "PP")
                      : "Schedule Interview"}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-2xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <div className="p-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Select Interview Date</h3>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="rounded-none border-0"
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
              <div className="p-3 border-t border-neutral-100 dark:border-neutral-800">
                <Button
                  onClick={() => setSelectedDate(date)} // Confirm selection
                  variant="default"
                  className="w-full h-10 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold rounded-full shadow-md transition"
                  disabled={!date}
                >
                  Confirm Date
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}