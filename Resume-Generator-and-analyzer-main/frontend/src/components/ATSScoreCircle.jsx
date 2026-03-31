import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const ATSScoreCircle = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    let timer;
    if (displayScore < score) {
      timer = setTimeout(() => {
        setDisplayScore(displayScore + 1);
      }, 20);
    }
    return () => clearTimeout(timer);
  }, [displayScore, score]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getScoreText = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
      style={{ perspective: '1000px' }}
      whileHover={{ rotateX: 2, rotateY: 2 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
        ATS Score
      </h2>
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="96"
              cy="96"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'} />
                <stop offset="100%" stopColor={score >= 80 ? '#059669' : score >= 60 ? '#ea580c' : '#ec4899'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={displayScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-bold text-white"
            >
              {displayScore}
            </motion.div>
            <div className="text-gray-400">out of 100</div>
          </div>
        </div>
        <div className={`mt-6 px-6 py-2 rounded-full bg-gradient-to-r ${getScoreColor(score)} bg-opacity-20 border border-white/20`}>
          <span className="text-white font-semibold">{getScoreText(score)}</span>
        </div>
        <p className="mt-4 text-center text-gray-400 text-sm">
          Your resume scores well with ATS systems. Continue optimizing for better results.
        </p>
      </div>
    </motion.div>
  );
};

export default ATSScoreCircle;