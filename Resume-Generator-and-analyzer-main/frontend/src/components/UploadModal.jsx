import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const UploadModal = ({ open, onClose, onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setUploadedFile(file);
    setIsUploading(true);
    setIsDragging(false);
    setErrorMsg("");

    try {
      console.log("UPLOAD START:", file.name, file.size, file.type);

      const formData = new FormData();
      formData.append("resume", file);

      console.log("Sending file to backend...");
      const res = await fetch("http://localhost:5000/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      // try to parse JSON safely
      let data;
      if (!res.ok) {
        // try to read JSON error body if present
        try {
          const errJson = await res.json();
          throw new Error(errJson.error || errJson.message || "Upload failed");
        } catch (e) {
          // res.json may fail; fallback to text
          const txt = await res.text();
          throw new Error(txt || "Upload failed");
        }
      } else {
        // successful response
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          data = await res.json();
        } else {
          // If backend returned plain text, put it into data.text
          const txt = await res.text();
          data = { text: txt };
        }
      }

      console.log("BACKEND RESPONSE:", data);
      console.log("🔍 Backend response structure:", {
        hasParsed: !!data.parsed,
        hasAtsScore: !!data.ats_score,
        parsedKeys: data.parsed ? Object.keys(data.parsed) : [],
      });

      // normalized parsed object
      let parsed = data.parsed || data || {};
      
      // Handle error case where LLM returned invalid JSON
      if (parsed.error && parsed.llm_output) {
        console.warn("⚠️ Backend returned error, attempting to parse llm_output manually...");
        try {
          // Try to extract JSON from llm_output
          let content = parsed.llm_output;
          content = content.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
          const jsonStart = content.indexOf("{");
          const jsonEnd = content.lastIndexOf("}");
          if (jsonStart !== -1 && jsonEnd !== -1) {
            const jsonStr = content.slice(jsonStart, jsonEnd + 1);
            parsed = JSON.parse(jsonStr);
            console.log("✅ Successfully parsed llm_output manually");
          }
        } catch (e) {
          console.error("❌ Could not parse llm_output:", e);
        }
      }
      
      console.log("📦 Extracted parsed object:", parsed);
      console.log("📦 Parsed object keys:", Object.keys(parsed));
      console.log("📦 Parsed.name value:", parsed.name, "Type:", typeof parsed.name);
      console.log("📦 Parsed.email value:", parsed.email, "Type:", typeof parsed.email);
      console.log("📦 Parsed.skills value:", parsed.skills, "Type:", typeof parsed.skills, "IsArray:", Array.isArray(parsed.skills));

      // Robust mapping to expected shape
      const mapped = {
        name: parsed.name || parsed.fullName || parsed.full_name || parsed.fullname || "",
        email: parsed.email || parsed.contact_email || parsed.mail || parsed.email_address || "",
        phone: parsed.phone || parsed.contact || parsed.mobile || parsed.phone_number || "",
        location: parsed.location || parsed.city || parsed.address || parsed.residence || "",
        // skills: handle array or delimited string
        skills: Array.isArray(parsed.skills)
          ? parsed.skills
          : (parsed.skills ? String(parsed.skills).split(/[,;\n]+/).map(s => s.trim()).filter(Boolean) : (parsed.skillSet || parsed.keywords || [])),
        // experience: array of objects or string fallback
        experience: Array.isArray(parsed.experience)
          ? parsed.experience
          : (typeof parsed.experience === "string" && parsed.experience.trim() ? [{ title: "", company: "", duration: parsed.experience }] : (parsed.positions || [])),
        atsScore: data.ats_score ?? data.atsScore ?? parsed.ats ?? 0,
        improvements: parsed.suggested_improvements || parsed.improvements || parsed.suggestions || []
      };

      // If skills empty, attempt lightweight keyword extraction from any raw text
      if ((!mapped.skills || mapped.skills.length === 0) && (parsed.raw_text || data.text || parsed.text)) {
        const text = (parsed.raw_text || data.text || parsed.text || "").toLowerCase();
        const keywords = (text.match(/\b(react|node|javascript|typescript|python|docker|aws|kubernetes|graphql|sql|java|mongodb|ci\/cd|html|css)\b/g) || [])
          .map(s => s.trim())
          .filter((v, i, a) => a.indexOf(v) === i);
        if (keywords.length) mapped.skills = keywords;
      }

      // Ensure experience is array and each item has title/company/duration
      if (!Array.isArray(mapped.experience)) mapped.experience = [];
      mapped.experience = mapped.experience.map((e) => {
        if (typeof e === "string") {
          return { title: e, company: "", duration: "" };
        }
        return {
          title: e.title ?? e.job_title ?? e.role ?? "",
          company: e.company ?? e.employer ?? "",
          duration: e.duration ?? (e.start && e.end ? `${e.start} - ${e.end}` : e.period ?? ""),
        };
      });

      // Persist to localStorage (AnalyzerPage reads this key)
      console.log("💾 Saving to localStorage:", mapped);
      localStorage.setItem("currentResumeParsed", JSON.stringify(mapped));

      // Notify parent page and close modal
      console.log("✅ Upload complete, calling onUploadComplete with:", mapped);
      onUploadComplete?.(mapped);
      // small delay so user sees 'done' animation (optional)
      setTimeout(() => {
        setIsUploading(false);
        setUploadedFile(null);
        onClose?.();
      }, 600);
    } catch (error) {
      console.error("Upload/Parse error:", error);
      setErrorMsg(error?.message || "Upload failed");
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-slate-900/95 backdrop-blur-xl border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Upload Your Resume
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <AnimatePresence mode="wait">
            {!isUploading && !uploadedFile ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  isDragging
                    ? 'border-blue-500 bg-blue-500/10 scale-105'
                    : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                }`}
              >
                <motion.div
                  animate={{
                    y: isDragging ? -10 : [0, -5, 0],
                  }}
                  transition={{
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="mb-4"
                >
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-semibold mb-2">
                  {isDragging ? 'Drop your file here' : 'Drag & drop your resume'}
                </h3>
                <p className="text-gray-400 mb-6">
                  or click to browse files
                </p>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Browse Files
                </Button>

                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: PDF, DOC, DOCX (Max 10MB)
                </p>
                {errorMsg && <div className="mt-4 text-sm text-red-400">{errorMsg}</div>}
              </motion.div>
            ) : isUploading ? (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="mx-auto w-24 h-24 mb-6"
                >
                  <div className="w-full h-full rounded-full border-4 border-white/10 border-t-blue-500 border-r-purple-500" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-2">Analyzing Resume...</h3>
                <p className="text-gray-400">This will only take a moment</p>

                <motion.div
                  className="mt-8 flex items-center justify-center space-x-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-center py-12">
                  <div className="mx-auto w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mb-4">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Upload Complete</h3>
                  <p className="text-gray-400">Resume analyzed and saved.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
