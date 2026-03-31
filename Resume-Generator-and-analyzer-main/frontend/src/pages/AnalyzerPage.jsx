import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Mail, Phone, MapPin, TrendingUp, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ATSScoreCircle from '@/components/ATSScoreCircle';
import SkillGapPanel from '@/components/SkillGapPanel';
import JobMatchScore from '@/components/JobMatchScore';
import UploadModal from '@/components/UploadModal';

const AnalyzerPage = () => {
  const [resumeData, setResumeData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [openUpload, setOpenUpload] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load resume data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("currentResumeParsed");
    console.log("🔄 Loading resume data... (trigger:", refreshTrigger, ")");
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        console.log("📊 Raw data from localStorage:", data);
        
        // UploadModal already saves flattened data, so we can use it directly
        // Just ensure all expected fields exist with defaults
        const normalizedData = {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          summary: data.summary || "",
          skills: Array.isArray(data.skills) ? data.skills : [],
          experience: Array.isArray(data.experience) ? data.experience : [],
          education: Array.isArray(data.education) ? data.education : [],
          atsScore: data.atsScore || 0,
          improvements: Array.isArray(data.improvements) ? data.improvements : []
        };
        
        console.log("✅ Normalized resume data:", normalizedData);
        console.log("👤 Name:", normalizedData.name);
        console.log("📧 Email:", normalizedData.email);
        console.log("📱 Phone:", normalizedData.phone);
        console.log("🎯 Skills count:", normalizedData.skills.length);
        
        setResumeData(normalizedData);
      } catch (e) {
        console.error("❌ Failed to parse stored resume:", e);
        setResumeData(null);
      }
    } else {
      console.log("ℹ️ No stored resume data found in localStorage");
      setResumeData(null);
    }
  }, [refreshTrigger]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!resumeData) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Resume Uploaded</h2>
          <p className="text-gray-400">Please upload a resume to analyze</p>
          <div className="mt-6">
            <Button onClick={() => setOpenUpload(true)} className="bg-indigo-600 text-white">
              Upload Resume
            </Button>
          </div>
        </div>

        <UploadModal
          open={openUpload}
          onClose={() => setOpenUpload(false)}
          onUploadComplete={(parsedData) => {
            setResumeData(parsedData);
            localStorage.setItem("currentResumeParsed", JSON.stringify(parsedData));
            setOpenUpload(false);
          }}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Resume Analyzer - NovaResume</title>
        <meta name="description" content="Analyze your resume with AI-powered insights, ATS score, skill gap analysis, and personalized improvement suggestions." />
      </Helmet>

      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Resume Analysis</h1>
            <p className="text-gray-400">Comprehensive insights and recommendations</p>
          </motion.div>

          {/* Upload Modal */}
          <UploadModal
            open={openUpload}
            onClose={() => setOpenUpload(false)}
            onUploadComplete={(parsedData) => {
              console.log("🎉 onUploadComplete triggered with data:", parsedData);
              setResumeData(parsedData);
              localStorage.setItem("currentResumeParsed", JSON.stringify(parsedData));
              setOpenUpload(false);
              // Trigger a refresh to reload from localStorage
              setRefreshTrigger(prev => prev + 1);
            }}
          />

          {/* Upload Button */}
          <div className="mb-6">
            <Button onClick={() => setOpenUpload(true)} className="bg-indigo-600 text-white">
              Upload Resume
            </Button>
          </div>

          {/* Resume Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 hover:bg-white/10 transition-all duration-300"
            style={{ perspective: '1000px' }}
            whileHover={{ rotateX: 2, rotateY: 2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-400" />
              Resume Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">{resumeData?.name || "N/A"}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-2 text-purple-400" />
                    {resumeData?.email || "N/A"}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-4 h-4 mr-2 text-purple-400" />
                    {resumeData?.phone || "N/A"}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                    {resumeData?.location || "N/A"}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {(resumeData?.skills || []).length > 0 ? (
                    resumeData.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-full text-sm text-white"
                      >
                        {skill}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-gray-400">No skills listed</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-3">Experience Timeline</h4>
              <div className="space-y-3">
                {(resumeData?.experience || []).length > 0 ? (
                  resumeData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2" />
                      <div className="flex-1">
                        <div className="font-semibold text-white">{exp?.title || "Position"}</div>
                        <div className="text-sm text-gray-400">{exp?.company || "Company"} • {exp?.duration || "N/A"}</div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-gray-400">No experience listed</div>
                )}
              </div>
            </div>
          </motion.div>

          {/* ATS Score and Skill Gap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ATSScoreCircle score={resumeData?.atsScore || 0} />
            <SkillGapPanel />
          </div>

          {/* Job Match Score */}
          <JobMatchScore />

          {/* Improvements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
              AI-Generated Improvements
            </h2>
            <div className="space-y-4">
              {(resumeData?.improvements || []).length > 0 ? (
                resumeData.improvements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                  >
                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 mr-3 text-yellow-400" />
                        <span className="font-semibold text-white">{item?.category || "Improvement"}</span>
                      </div>
                      {expandedSections[index] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedSections[index] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 bg-black/20 border-t border-white/10">
                            <ul className="space-y-2">
                              {(item?.suggestions || []).map((suggestion, sIndex) => (
                                <motion.li
                                  key={sIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: sIndex * 0.05 }}
                                  className="flex items-start text-gray-300"
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-400 flex-shrink-0" />
                                  <span>{suggestion}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="text-gray-400">No improvement suggestions available</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AnalyzerPage;
