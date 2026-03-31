import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Sparkles, Target, Zap, TrendingUp, FileText, BarChart as BarChartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UploadModal from '@/components/UploadModal';

const HomePage = () => {
  const navigate = useNavigate();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const features = [
    {
      icon: Target,
      title: 'ATS Score Analysis',
      description: 'Get instant feedback on how well your resume performs with ATS systems',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Suggestions',
      description: 'Receive personalized recommendations to improve your resume',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Skill Gap Detection',
      description: 'Identify missing keywords and skills for your target role',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Create professional resumes and cover letters in seconds',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <>
      <Helmet>
        <title>NovaResume - Advanced AI Resume Platform</title>
        <meta name="description" content="The most advanced AI-powered resume builder and analyzer. Create ATS-optimized resumes in minutes." />
      </Helmet>

      <div className="min-h-screen pt-16 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left space-y-8 relative z-10"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  ✨ The Future of Career Building
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
                Your Smart AI <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Resume Assistant
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                Analyze. Improve. Generate. All in one place. Experience the next generation of resume building with real-time AI feedback.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setUploadModalOpen(true)}
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-gray-100 h-14 px-8 text-lg font-semibold rounded-xl shadow-xl shadow-purple-900/20 transition-all hover:scale-105"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Resume
                </Button>
                <Button
                  onClick={() => navigate('/generator')}
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 h-14 px-8 text-lg rounded-xl backdrop-blur-md"
                >
                  Create New
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>ATS Optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>AI Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span>Live Preview</span>
                </div>
              </div>
            </motion.div>

            {/* 3D Floating Visuals */}
            <div className="relative h-[600px] hidden lg:block perspective-1000">
              <motion.div style={{ y: y1 }} className="absolute top-10 right-10 z-20">
                <div className="w-64 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl transform rotate-[-6deg] hover:rotate-0 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">ATS Score</div>
                      <div className="text-2xl font-bold text-white">94/100</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-green-500 rounded-full" />
                  </div>
                </div>
              </motion.div>

              <motion.div style={{ y: y2 }} className="absolute bottom-20 left-10 z-30">
                <div className="w-72 p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl transform rotate-[4deg] hover:rotate-0 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">Skill Match</span>
                    <span className="text-blue-400">High</span>
                  </div>
                  <div className="space-y-2">
                    {['React', 'Node.js', 'Python', 'AWS'].map((skill, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{skill}</span>
                        <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${85 + Math.random() * 15}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                            className="h-full bg-blue-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Simulated Lottie/Resume Graphic */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[420px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl"
              >
                <div className="w-full h-full flex flex-col gap-4 opacity-80">
                  <div className="flex gap-4 items-center border-b border-white/10 pb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-3/4 bg-white/20 rounded animate-pulse" />
                      <div className="h-2 w-1/2 bg-white/10 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="h-2 w-full bg-white/5 rounded" />
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-6 w-16 bg-blue-500/20 rounded-full" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadComplete={() => {
          setUploadModalOpen(false);
          navigate('/analyzer');
        }}
      />
    </>
  );
};

export default HomePage;