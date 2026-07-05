"use client";

import { useState, useRef } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { RefreshCw, FileText, UploadCloud, X, FileSpreadsheet, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { rankUploadedResumes } from "@/src/lib/actions/rank/rankResumes";

export default function HirePage() {
  // On-The-Fly Upload and Rank states
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [onFlyJobTitle, setOnFlyJobTitle] = useState("");
  const [onFlyJobDesc, setOnFlyJobDesc] = useState("");
  const [onFlyResults, setOnFlyResults] = useState<{
    rank: number;
    filename: string;
    score: number;
    matched?: string[];
    missing?: string[];
  }[]>([]);
  const [selectedResume, setSelectedResume] = useState<{
    rank: number;
    filename: string;
    score: number;
    matched?: string[];
    missing?: string[];
  } | null>(null);
  const [isOnFlyRanking, setIsOnFlyRanking] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files).filter(
        (file) => file.type === "application/pdf"
      );
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).filter(
        (file) => file.type === "application/pdf"
      );
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOnFlyRank = async () => {
    if (!onFlyJobDesc.trim() || uploadedFiles.length === 0) return;
    setIsOnFlyRanking(true);
    try {
      const formData = new FormData();
      formData.append("job_description", onFlyJobDesc);
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const results = await rankUploadedResumes(formData);
      setOnFlyResults(results);
    } catch (error) {
      console.error("Failed to rank uploaded resumes:", error);
    } finally {
      setIsOnFlyRanking(false);
    }
  };

  const handleOnFlyReset = () => {
    setOnFlyJobTitle("");
    setOnFlyJobDesc("");
    setUploadedFiles([]);
    setOnFlyResults([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadCSV = () => {
    if (onFlyResults.length === 0) return;
    const title = onFlyJobTitle.trim() || "Ranked_Resumes";
    const headers = "Rank,Resume Name,Match Score\n";
    const rows = onFlyResults
      .map((r) => `${r.rank},"${r.filename.replace(/"/g, '""')}",${r.score}%`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title.replace(/\s+/g, "_")}_ranking_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-85% w-full flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-950 my-12">
      {/* Scrollable content container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        {/* Background decorative elements */}
        <div className="fixed top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
        <div className="fixed bottom-20 left-20 w-72 h-72 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">Candidate Rankings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Paste a job description and upload candidate resumes (PDF) to dynamically match and rank them using AI.
          </p>
        </div>

        <div className="space-y-6">
          {/* On Fly Form Card */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20">
            <h2 className="text-base font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
              <span className="w-1 h-5 bg-green-500 rounded-full mr-3 inline-block"></span>
              Upload PDF Resumes & Job Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Job Title</label>
                  <Input
                    type="text"
                    placeholder="e.g. Trainee Engineer / Senior React Developer"
                    value={onFlyJobTitle}
                    onChange={(e) => setOnFlyJobTitle(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Job Description</label>
                  <textarea
                    className="w-full min-h-[160px] p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Paste the target job description details here..."
                    value={onFlyJobDesc}
                    onChange={(e) => setOnFlyJobDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Upload Candidate Resumes (PDF)</label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors h-[218px] flex flex-col justify-center items-center ${
                      dragActive
                        ? "border-green-500 bg-green-50/50 dark:bg-green-950/20"
                        : "border-gray-300 dark:border-gray-700 hover:border-green-500 hover:bg-gray-50/30 dark:hover:bg-gray-800/10"
                    }`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-3" />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Drag and drop resumes here, or <span className="text-green-600 dark:text-green-400 font-medium">browse</span>
                    </p>
                    <p className="text-xs text-gray-400">Only PDF files are supported</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Selected PDF Files ({uploadedFiles.length})</p>
                  <button type="button" onClick={() => setUploadedFiles([])} className="text-xs text-red-500 hover:underline">Clear all</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[160px] overflow-y-auto pr-1">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-2 min-w-0">
                        <FileText className="h-4 w-4 text-purple-500 flex-shrink-0" />
                        <span className="text-xs text-gray-700 dark:text-gray-300 truncate" title={file.name}>{file.name}</span>
                        <span className="text-[9px] text-gray-400 flex-shrink-0">({(file.size / 1024).toFixed(0)} KB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeUploadedFile(idx); }}
                        className="text-gray-400 hover:text-red-500 ml-2"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleOnFlyRank}
                disabled={isOnFlyRanking || !onFlyJobDesc.trim() || uploadedFiles.length === 0}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md shadow-green-500/10"
              >
                {isOnFlyRanking ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" /> Ranking Resumes...
                  </span>
                ) : "Rank Resumes"}
              </Button>
              {(onFlyJobDesc || uploadedFiles.length > 0) && (
                <Button
                  variant="outline"
                  onClick={handleOnFlyReset}
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Reset List
                </Button>
              )}
            </div>
          </div>

          {/* On Fly Results Section */}
          {onFlyResults.length > 0 && (
            <div className="space-y-6">
              {/* On Fly Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/20">
                  <div className="flex items-center">
                    <div className="p-2.5 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Resumes Ranked</p>
                      <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{onFlyResults.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-green-100 dark:border-green-900/20">
                  <div className="flex items-center">
                    <div className="p-2.5 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="ml-3 min-w-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Best Match</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate" title={onFlyResults[0].filename}>
                        {onFlyResults[0].filename}
                      </p>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">({onFlyResults[0].score}% Match)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/20 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2.5 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <FileSpreadsheet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Export Results</p>
                      <p className="text-xs text-gray-400">Format: Excel compatible CSV</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={downloadCSV} className="border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-950/20 text-purple-600 dark:text-purple-400">
                    Download CSV
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Results List */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20">
                  <h3 className="text-sm font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="w-1 h-4 bg-purple-500 rounded-full mr-2"></span>
                    Ranked Results
                  </h3>
                  <div className="overflow-y-auto max-h-[350px] pr-1 space-y-2">
                    {onFlyResults.map((result) => (
                      <div
                        key={result.rank}
                        onClick={() => setSelectedResume(result)}
                        className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/30 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:scale-[1.01] transition-all duration-200"
                        title="Click to view match details"
                      >
                        <div className="flex items-center min-w-0">
                          <div className="h-7 w-7 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold text-xs flex-shrink-0">
                            {result.rank}
                          </div>
                          <span className="ml-3 text-xs font-medium text-gray-800 dark:text-gray-200 truncate max-w-[170px]" title={result.filename}>
                            {result.filename}
                          </span>
                        </div>
                        <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 font-semibold px-2.5 py-1 rounded-full">
                          {result.score}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md border border-green-100 dark:border-green-900/20">
                  <h3 className="text-sm font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="w-1 h-4 bg-green-500 rounded-full mr-2"></span>
                    Match Scores Chart
                  </h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="99%" height="100%">
                      <BarChart data={onFlyResults.map(r => ({ name: r.filename, score: r.score }))}>
                        <defs>
                          <linearGradient id="onFlyGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.15} />
                          </linearGradient>
                          <linearGradient id="onFlySub" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.15} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} tickFormatter={(val) => val.length > 15 ? val.substring(0, 12) + "..." : val} />
                        <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            borderColor: "#cbd5e1",
                            borderRadius: "0.5rem",
                            fontSize: "12px"
                          }}
                          formatter={(value) => [`${value}% Match`, "Score"]}
                        />
                        <Bar dataKey="score" barSize={35} radius={[4, 4, 0, 0]}>
                          {onFlyResults.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? "url(#onFlyGlow)" : "url(#onFlySub)"} stroke={index === 0 ? "#10b981" : "#3b82f6"} strokeWidth={1} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedResume && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-150 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-500" />
                  {selectedResume.filename}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Analysis results and keyword matching breakdown
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-1 rounded-full">
                  {selectedResume.score}% Match
                </span>
                <button
                  onClick={() => setSelectedResume(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Matched Points */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Matched Points ({selectedResume.matched?.length || 0})
                </h4>
                {selectedResume.matched && selectedResume.matched.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedResume.matched.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-green-50/50 dark:bg-green-950/10 border border-green-100/50 dark:border-green-900/20 p-2.5 rounded-lg text-xs text-gray-700 dark:text-gray-300">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">No matching keywords/skills found.</p>
                )}
              </div>

              {/* Missing Points */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Missing Points ({selectedResume.missing?.length || 0})
                </h4>
                {selectedResume.missing && selectedResume.missing.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedResume.missing.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-red-50/50 dark:bg-red-950/10 border border-red-100/50 dark:border-red-900/20 p-2.5 rounded-lg text-xs text-gray-700 dark:text-gray-300">
                        <span className="text-red-500 font-bold">✗</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">No missing critical keywords/skills detected.</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-150 dark:border-gray-800 flex justify-end bg-gray-50 dark:bg-gray-900/50">
              <Button
                onClick={() => setSelectedResume(null)}
                className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-750 text-white"
              >
                Close Analysis
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}