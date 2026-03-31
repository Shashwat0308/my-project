import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';

const SkillDistributionChart = () => {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0, 0]);
  
  const skills = [
    { name: 'Frontend', value: 35, color: '#3b82f6' },
    { name: 'Backend', value: 25, color: '#8b5cf6' },
    { name: 'DevOps', value: 15, color: '#10b981' },
    { name: 'Database', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 10, color: '#ec4899' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues(prev => 
        prev.map((val, idx) => {
          if (val < skills[idx].value) {
            return Math.min(val + 1, skills[idx].value);
          }
          return val;
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const total = animatedValues.reduce((sum, val) => sum + val, 0);
  let currentAngle = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <PieChart className="w-6 h-6 mr-2 text-blue-400" />
        Skill Distribution
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Pie Chart */}
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {animatedValues.map((value, index) => {
              if (value === 0) return null;
              
              const percentage = (value / total) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              currentAngle += angle;

              const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const endX = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
              const endY = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);

              const largeArc = angle > 180 ? 1 : 0;

              return (
                <motion.path
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                  fill={skills[index].color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
            <circle cx="50" cy="50" r="25" fill="rgba(0,0,0,0.3)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{total}%</div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 flex-1">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: skill.color }}
                />
                <span className="text-white font-medium">{skill.name}</span>
              </div>
              <span className="text-gray-400 font-semibold">{animatedValues[index]}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillDistributionChart;