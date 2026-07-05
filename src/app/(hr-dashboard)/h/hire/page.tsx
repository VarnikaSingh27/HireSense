"use client";
import { useState } from "react";
import { Plus, Search, FileText, UserPlus, ChevronRight, Star, Briefcase, Users, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useRouter } from "next/navigation";

// Sample data for user details with rank and additional users (total 8 users)
const sampleUsers = [
  {
    id: 1,
    rank: 138,
    name: "Jonathan Doe",
    skills: "JavaScript, React, Node.js",
    hiringPost: "Frontend Developer",
    resumeUrl: "/resumes/john-doe.pdf",
  },
  {
    id: 2,
    rank: 259,
    name: "Sarah Jenkins",
    skills: "Python, Django, REST",
    hiringPost: "Backend Developer",
    resumeUrl: "/resumes/jane-smith.pdf",
  },
  {
    id: 3,
    rank: 322,
    name: "Evelyn Vance",
    skills: "UI/UX, Figma, CSS",
    hiringPost: "Design Specialist",
    resumeUrl: "/resumes/alice-johnson.pdf",
  },
  {
    id: 4,
    rank: 540,
    name: "Robert Brown",
    skills: "Java, Spring Boot, Microservices",
    hiringPost: "Full Stack Developer",
    resumeUrl: "/resumes/bob-brown.pdf",
  },
  {
    id: 5,
    rank: 582,
    name: "Emily Watson",
    skills: "Ruby, Rails, PostgreSQL",
    hiringPost: "Backend Developer",
    resumeUrl: "/resumes/emma-wilson.pdf",
  },
  {
    id: 6,
    rank: 610,
    name: "Christopher Evans",
    skills: "React, Redux, TypeScript",
    hiringPost: "Frontend Developer",
    resumeUrl: "/resumes/chris-evans.pdf",
  },
  {
    id: 7,
    rank: 645,
    name: "Victoria Sterling",
    skills: "Python, Flask, SQL",
    hiringPost: "Backend Developer",
    resumeUrl: "/resumes/natalie-portman.pdf",
  },
  {
    id: 8,
    rank: 670,
    name: "Marcus Rutherford",
    skills: "Full Stack, Node.js, MongoDB",
    hiringPost: "Full Stack Developer",
    resumeUrl: "/resumes/mark-ruffalo.pdf",
  },
];

export default function HirePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users by search term (case-insensitive)
  const filteredUsers = sampleUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.hiringPost.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count users by role
  const roleCount: {[key: string]: number} = {};
  sampleUsers.forEach(user => {
    roleCount[user.hiringPost] = (roleCount[user.hiringPost] || 0) + 1;
  });

  return (
    <div className="flex flex-col p-6">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100/20 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/20 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
      
      {/* Header Section */}
      <div className="mb-8 my-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-neutral-850 to-neutral-950 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent mb-2">
          Hiring Dashboard
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          View previously hired candidates and initiate new hiring processes.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/70 dark:bg-neutral-900/40 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-neutral-200/60 dark:border-neutral-850/60 hover:shadow-md transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100/70 dark:bg-purple-900/20 rounded-2xl">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400">Total Hired</p>
              <p className="text-2xl font-black text-neutral-800 dark:text-neutral-200">{sampleUsers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/70 dark:bg-neutral-900/40 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-neutral-200/60 dark:border-neutral-850/60 hover:shadow-md transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-green-100/70 dark:bg-green-900/20 rounded-2xl">
              <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400">Frontend Devs</p>
              <p className="text-2xl font-black text-neutral-800 dark:text-neutral-200">
                {roleCount['Frontend Developer'] || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/70 dark:bg-neutral-900/40 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-neutral-200/60 dark:border-neutral-850/60 hover:shadow-md transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100/70 dark:bg-purple-900/20 rounded-2xl">
              <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400">Backend Devs</p>
              <p className="text-2xl font-black text-neutral-800 dark:text-neutral-200">
                {roleCount['Backend Developer'] || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/70 dark:bg-neutral-900/40 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-neutral-200/60 dark:border-neutral-850/60 hover:shadow-md transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-green-100/70 dark:bg-green-900/20 rounded-2xl">
              <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400">Avg. Rank</p>
              <p className="text-2xl font-black text-neutral-800 dark:text-neutral-200">
                {Math.round(sampleUsers.reduce((acc, user) => acc + user.rank, 0) / sampleUsers.length)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="bg-white/70 dark:bg-neutral-900/40 backdrop-blur-md p-6 rounded-3xl shadow-md border border-neutral-200/60 dark:border-neutral-850/60 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search candidates by name or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white/50 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-750 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:outline-none transition w-full shadow-sm text-sm"
            />
          </div>
          
          <Button
            onClick={() => router.push("/h/rank")}
            className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold rounded-full py-2.5 px-6 shadow-md hover:shadow-green-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <UserPlus className="h-4 w-4" /> Hire New Candidate
          </Button>
        </div>
      </div>
      
      {/* Candidate Cards */}
      <div className="bg-white/70 dark:bg-neutral-900/40 backdrop-blur-md p-6 sm:p-8 rounded-[32px] shadow-md border border-neutral-200/60 dark:border-neutral-850/60">
        <h2 className="text-lg font-bold mb-6 text-neutral-800 dark:text-neutral-100 flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Hired Candidates ({filteredUsers.length})
        </h2>
        
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-5 bg-white/50 dark:bg-neutral-950/40 backdrop-blur-sm rounded-2xl border border-neutral-200/50 dark:border-neutral-850/40 hover:border-purple-300 dark:hover:border-purple-800/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-extrabold text-neutral-800 dark:text-neutral-100 text-lg hover:text-purple-600 dark:hover:text-purple-400 transition">
                      {user.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-100/70 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">
                        Rank: {user.rank}
                      </span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-green-100/70 dark:bg-green-950/50 text-green-600 dark:text-green-400 font-bold uppercase tracking-wider">
                        {user.hiringPost}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">Skills: </span>
                      {user.skills}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(user.resumeUrl, "_blank")}
                    className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-full font-bold transition px-4 py-2 border border-purple-200 dark:border-purple-800/50 hover:border-purple-305 flex items-center gap-1.5 shadow-sm"
                  >
                    <FileText className="h-4 w-4" /> View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No candidates match your search criteria</p>
          </div>
        )}
      </div>
      
      {/* Floating Action Button (Mobile only) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => router.push("/h/rank")}
          className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white p-4 rounded-full shadow-lg flex items-center justify-center w-14 h-14"
          size="icon"
        >
          <UserPlus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}