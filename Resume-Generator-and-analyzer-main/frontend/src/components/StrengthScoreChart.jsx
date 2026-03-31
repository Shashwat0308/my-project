import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const StrengthScoreChart = () => {
  const [animatedData, setAnimatedData] = useState([0, 0, 0, 0, 0, 0, 0]);
  
  const data = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 72 },
    { label: 'Wed', value: 68 },
    { label: 'Thu', value: 80 },
    { label: 'Fri', value: 85 },
    { label: 'Sat', value: 78 },
    { label: 'Sun', value: 82 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedData(prev =>
        prev.map((val, idx) => {
          if (val < data[idx].value) {
            return Math.min(val + 2, data[idx].value);
          }
          return val;
        })
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Activity className="w-6 h-6 mr-2 text-green-400" />
        Weekly Strength Score
      </h2>

      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((item, index) => {
          const height = (animatedData[index] / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg relative group cursor-pointer hover:from-blue-500 hover:to-purple-500 transition-all"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                  {animatedData[index]}
                </div>
              </motion.div>
              <span className="text-xs text-gray-400 mt-2">{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-white/5 rounded-lg">
          <div className="text-sm text-gray-400">Average</div>
          <div className="text-2xl font-bold text-white">
            {Math.round(animatedData.reduce((a, b) => a + b, 0) / animatedData.length)}
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded-lg">
          <div className="text-sm text-gray-400">Peak</div>
          <div className="text-2xl font-bold text-white">
            {Math.max(...animatedData)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StrengthScoreChart;