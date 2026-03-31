import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Target, Award } from 'lucide-react';
import SkillDistributionChart from '@/components/SkillDistributionChart';
import StrengthScoreChart from '@/components/StrengthScoreChart';

const AnalyticsPage = () => {
  const stats = [
    {
      title: 'Overall Score',
      value: '82/100',
      change: '+5%',
      icon: Award,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Skills Match',
      value: '76%',
      change: '+12%',
      icon: Target,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'ATS Compatibility',
      value: '85%',
      change: '+8%',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Improvement Areas',
      value: '3',
      change: '-2',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const categories = [
    { name: 'Technical Skills', score: 92, color: '#3b82f6' },
    { name: 'Soft Skills', score: 78, color: '#8b5cf6' },
    { name: 'Experience', score: 85, color: '#10b981' },
    { name: 'Education', score: 88, color: '#f59e0b' },
    { name: 'Certifications', score: 65, color: '#ec4899' },
  ];

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - NovaResume</title>
        <meta name="description" content="Comprehensive analytics dashboard with skill distribution, strength scores, and performance insights." />
      </Helmet>

      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Comprehensive insights into your resume performance</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-semibold ${
                      stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SkillDistributionChart />
            <StrengthScoreChart />
          </div>

          {/* Category Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Category Performance</h2>
            <div className="space-y-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{category.name}</span>
                    <span className="text-gray-400">{category.score}%</span>
                  </div>
                  <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;