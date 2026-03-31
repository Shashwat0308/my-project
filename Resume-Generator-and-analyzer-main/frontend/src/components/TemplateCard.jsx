import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const TemplateCard = ({ template, index, isSelected, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        rotateY: 10,
        rotateX: 5,
      }}
      onClick={() => onSelect(template)}
      className="relative group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <div className={`backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${
        isSelected 
          ? 'bg-white/10 border-white/30 shadow-2xl shadow-purple-500/20' 
          : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}>
        {/* Template Preview */}
        <div className={`h-64 bg-gradient-to-br ${template.gradient} p-6 relative overflow-hidden`}>
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="space-y-3"
          >
            <div className="h-3 bg-white/30 rounded w-3/4" />
            <div className="h-2 bg-white/20 rounded w-1/2" />
            <div className="h-2 bg-white/20 rounded w-2/3" />
            <div className="h-2 bg-white/20 rounded w-3/5" />
          </motion.div>

          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center"
            >
              <Check className="w-5 h-5 text-purple-600" />
            </motion.div>
          )}
        </div>

        {/* Template Info */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
          <p className="text-sm text-gray-400">{template.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;