import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Briefcase, Building2, GraduationCap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AutoGenerator = ({ open, onOpenChange, onGenerate }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    industry: '',
    experience: '',
  });

  const handleAutoGenerate = () => {
    setLoading(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const aiConfig = {
        templateId: formData.industry === 'creative' ? 'creative' : 
                   formData.industry === 'tech' ? 'modern' : 'professional',
        color: formData.industry === 'creative' ? '#f43f5e' : 
               formData.industry === 'tech' ? '#3b82f6' : '#0f172a',
        font: formData.industry === 'creative' ? 'Montserrat' : 
              formData.industry === 'tech' ? 'Inter' : 'Times New Roman', // Fallback to serif for traditional
      };
      
      onGenerate(aiConfig);
      setLoading(false);
      onOpenChange(false);
      setStep(1);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wand2 className="w-5 h-5 text-purple-400" />
            AI Auto-Generation
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Tell us about your goal, and our AI will select the perfect template, styles, and layout for you.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {!loading ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Target Role</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-md pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g. Product Manager"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Industry</Label>
                <Select onValueChange={(val) => setFormData({...formData, industry: val})}>
                  <SelectTrigger className="bg-white/5 border-white/10 pl-10 relative">
                    <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/10 text-white">
                    <SelectItem value="tech">Technology & Startups</SelectItem>
                    <SelectItem value="finance">Finance & Corporate</SelectItem>
                    <SelectItem value="creative">Design & Creative</SelectItem>
                    <SelectItem value="academic">Education & Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Experience Level</Label>
                <Select onValueChange={(val) => setFormData({...formData, experience: val})}>
                  <SelectTrigger className="bg-white/5 border-white/10 pl-10 relative">
                    <GraduationCap className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/10 text-white">
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                    <SelectItem value="exec">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleAutoGenerate}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4"
                disabled={!formData.role || !formData.industry}
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Generate Magic Resume
              </Button>
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Wand2 className="w-12 h-12 text-purple-500" />
              </motion.div>
              <h3 className="text-lg font-semibold">AI is designing your resume...</h3>
              <p className="text-gray-400 text-sm mt-2">Selecting typography, layouts, and optimal color palettes based on your industry.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SparklesIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default AutoGenerator;