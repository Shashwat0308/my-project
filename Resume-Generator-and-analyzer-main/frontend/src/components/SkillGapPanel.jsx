import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Plus } from 'lucide-react';

const SkillGapPanel = () => {
  const missingKeywords = [
    { keyword: 'Machine Learning', importance: 'High' },
    { keyword: 'Kubernetes', importance: 'Medium' },
    { keyword: 'GraphQL', importance: 'Medium' },
    { keyword: 'CI/CD', importance: 'High' },
    { keyword: 'Agile', importance: 'Low' },
    { keyword: 'Microservices', importance: 'High' },
  ];

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'High':
        return 'from-red-500 to-orange-500';
      case 'Medium':
        return 'from-yellow-500 to-orange-500';
      case 'Low':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
      style={{ perspective: '1000px' }}
      whileHover={{ rotateX: 2, rotateY: 2 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
        Skill Gap Report
      </h2>
      <p className="text-gray-400 mb-6">
        Keywords and skills that could improve your resume's performance
      </p>
      <div className="space-y-3">
        {missingKeywords.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${getImportanceColor(item.importance)}`} />
              <div>
                <div className="font-semibold text-white">{item.keyword}</div>
                <div className="text-xs text-gray-400">Importance: {item.importance}</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
            >
              <Plus className="w-4 h-4 text-gray-400" />
            </motion.button>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong className="text-yellow-400">Tip:</strong> Adding these keywords can increase your ATS score by up to 15 points.
        </p>
      </div>
    </motion.div>
  );
};

export default SkillGapPanel;