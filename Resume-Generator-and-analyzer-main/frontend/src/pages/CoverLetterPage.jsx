import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const CoverLetterPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    hiringManager: '',
    jobDescription: '',
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const sampleLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the [Job Title] position at [Company Name]. With my extensive background in software development and proven track record of delivering high-quality solutions, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed expertise in modern web technologies, including React, Node.js, and cloud platforms. My experience aligns perfectly with the requirements outlined in your job posting, particularly in areas of full-stack development and system architecture.

At my current role, I have successfully led multiple projects from conception to deployment, consistently meeting deadlines and exceeding performance expectations. I am particularly proud of implementing a microservices architecture that improved system reliability by 40% and reduced deployment time by 60%.

I am excited about the opportunity to bring my technical skills, leadership experience, and passion for innovation to [Company Name]. I am confident that my background and enthusiasm make me an ideal candidate for this position.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team's success.

Sincerely,
[Your Name]`;

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const typeWriter = (text, index = 0) => {
    if (index < text.length) {
      setCurrentText(text.substring(0, index + 1));
      setTimeout(() => typeWriter(text, index + 1), 20);
    } else {
      setIsGenerating(false);
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setCurrentText('');
    
    let personalizedLetter = sampleLetter
      .replace('[Job Title]', formData.jobTitle || '[Job Title]')
      .replace('[Company Name]', formData.companyName || '[Company Name]')
      .replace(/\[Company Name\]/g, formData.companyName || '[Company Name]');

    setGeneratedLetter(personalizedLetter);
    setTimeout(() => {
      typeWriter(personalizedLetter);
    }, 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    toast({
      title: "Copied to clipboard!",
      description: "Cover letter has been copied successfully.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Cover Letter Generator - NovaResume</title>
        <meta name="description" content="Generate professional cover letters with AI. Customize for any job position and company." />
      </Helmet>

      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
              <Mail className="w-10 h-10 mr-3 text-purple-400" />
              AI Cover Letter Generator
            </h1>
            <p className="text-gray-400">Create personalized cover letters in seconds</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
                Job Details
              </h2>

              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <Label className="text-white mb-2 block">Job Title</Label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleChange('jobTitle', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Company Name</Label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Tech Corp"
                    required
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Hiring Manager (Optional)</Label>
                  <input
                    type="text"
                    value={formData.hiringManager}
                    onChange={(e) => handleChange('hiringManager', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Jane Smith"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Job Description (Optional)</Label>
                  <textarea
                    value={formData.jobDescription}
                    onChange={(e) => handleChange('jobDescription', e.target.value)}
                    className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Paste job description for better personalization..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
                </Button>
              </form>
            </motion.div>

            {/* Output */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Generated Cover Letter</h2>
                {currentText && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 min-h-[500px]">
                {currentText ? (
                  <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                    {currentText}
                    {isGenerating && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-purple-500 ml-1"
                      />
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Mail className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p>Your AI-generated cover letter will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverLetterPage;