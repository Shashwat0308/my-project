import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const ResumeEditor = ({ template, onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Edit Your Information
        </h2>
        <p className="text-gray-400">
          Fill in your details to generate a professional resume using the{' '}
          <span className={`bg-gradient-to-r ${template.gradient} bg-clip-text text-transparent font-semibold`}>
            {template.name}
          </span>{' '}
          template
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-white mb-2 block">Full Name</Label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Email</Label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Phone</Label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Location</Label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="San Francisco, CA"
              required
            />
          </div>
        </div>

        <div>
          <Label className="text-white mb-2 block">Professional Summary</Label>
          <textarea
            value={formData.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Brief summary of your professional background..."
            required
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">Experience</Label>
          <textarea
            value={formData.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
            className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="List your work experience..."
            required
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">Education</Label>
          <textarea
            value={formData.education}
            onChange={(e) => handleChange('education', e.target.value)}
            className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="List your educational background..."
            required
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">Skills</Label>
          <textarea
            value={formData.skills}
            onChange={(e) => handleChange('skills', e.target.value)}
            className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="List your key skills..."
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Resume...
            </>
          ) : (
            'Generate Resume'
          )}
        </Button>
      </form>

      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                />
              ))}
            </div>
            <p className="text-white">AI is crafting your professional resume...</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeEditor;