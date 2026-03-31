import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const JobMatchScore = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [matchScore, setMatchScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMatch = () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setMatchScore(Math.floor(Math.random() * 30) + 65); // Random score between 65-95
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 hover:bg-white/10 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Target className="w-6 h-6 mr-2 text-purple-400" />
        Job Match Score
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Paste Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here to see how well your resume matches..."
            className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        <Button
          onClick={analyzeMatch}
          disabled={!jobDescription.trim() || isAnalyzing}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          {isAnalyzing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Analyze Match
            </>
          )}
        </Button>

        <AnimatePresence>
          {matchScore !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-semibold">Match Score</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-white"
                  >
                    {matchScore}%
                  </motion.span>
                </div>
                
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${matchScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>

                <p className="mt-4 text-sm text-gray-300">
                  Your resume matches {matchScore}% of the job requirements. 
                  {matchScore >= 80 ? ' Excellent match!' : matchScore >= 60 ? ' Good match with room for improvement.' : ' Consider adding more relevant keywords.'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default JobMatchScore;