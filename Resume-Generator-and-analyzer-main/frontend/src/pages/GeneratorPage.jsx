import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Download, Share2, Wand2, Monitor, Edit3 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

import ResumeEditor from '@/components/ResumeEditor';
import CustomizationPanel from '@/components/CustomizationPanel';
import ResumePreview from '@/components/ResumePreview';
import AutoGenerator from '@/components/AutoGenerator';

const GeneratorPage = () => {
  const { toast } = useToast();
  const previewRef = useRef(null);
  const [autoGenOpen, setAutoGenOpen] = useState(false);
  
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('edit');
  const [selectedTemplateId, setSelectedTemplateId] = useState('modern');
  
  // Resume Data
  const [resumeData, setResumeData] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 012-3456',
    location: 'New York, NY',
    summary: 'Innovative Product Designer with 5+ years of experience creating user-centered digital products. Proven track record of improving user engagement and driving conversion through intuitive design solutions.',
    experience: 'Senior Product Designer | TechFlow Inc. \n2020 - Present\n• Led redesign of core mobile app increasing retention by 25%\n• Mentored junior designers and established design system\n\nUX Designer | StartUp Co.\n2018 - 2020\n• Designed end-to-end flows for SaaS dashboard',
    education: 'BFA Interaction Design | Parsons School of Design\n2014 - 2018',
    skills: 'Figma, React, Prototyping, User Research, Design Systems, HTML/CSS',
  });

  // Visual Settings
  const [settings, setSettings] = useState({
    font: 'Inter',
    color: '#3b82f6',
    fontSize: 14,
    spacing: 'normal',
    columns: 1,
    uppercaseHeaders: true,
  });

  const templates = [
    { id: 'minimal', name: 'Minimalist', gradient: 'from-slate-200 to-slate-400' },
    { id: 'professional', name: 'Professional', gradient: 'from-blue-900 to-slate-900' },
    { id: 'modern', name: 'Modern Tech', gradient: 'from-blue-500 to-cyan-400' },
    { id: 'creative', name: 'Creative Bold', gradient: 'from-rose-500 to-orange-400' },
    { id: 'executive', name: 'Executive', gradient: 'from-emerald-800 to-slate-900' },
    { id: 'startup', name: 'Startup', gradient: 'from-violet-600 to-indigo-600' },
    { id: 'academic', name: 'Academic', gradient: 'from-slate-600 to-stone-500' },
  ];

  // --- HANDLERS ---
  const handleSettingUpdate = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDataUpdate = (newData) => {
    setResumeData(prev => ({ ...prev, ...newData }));
    toast({ title: "Saved", description: "Resume data updated." });
  };

  const handleAutoGenerate = (aiConfig) => {
    setSelectedTemplateId(aiConfig.templateId);
    setSettings(prev => ({
      ...prev,
      color: aiConfig.color,
      font: aiConfig.font,
    }));
    toast({
      title: "✨ Magic Applied",
      description: "AI has optimized your resume style based on your industry.",
    });
  };

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    toast({ title: "Generating PDF...", description: "Please wait while we render your document." });

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // High res
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      
      toast({ title: "Success!", description: "PDF downloaded successfully." });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF." });
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Resume Generator - NovaResume</title>
      </Helmet>

      <div className="h-screen pt-16 flex flex-col bg-slate-950 overflow-hidden">
        {/* Toolbar */}
        <div className="h-16 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-white font-bold text-lg">Resume Generator</h1>
            <div className="h-6 w-px bg-white/10" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setAutoGenOpen(true)}
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Auto-Generate
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleDownloadPDF} className="bg-white text-slate-900 hover:bg-gray-200">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Controls */}
          <div className="w-[400px] flex-shrink-0 bg-slate-900 border-r border-white/10 flex flex-col">
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('edit')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'edit' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              >
                <Edit3 className="w-4 h-4 mx-auto mb-1" /> Content
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'design' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
              >
                <Monitor className="w-4 h-4 mx-auto mb-1" /> Design
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activeTab === 'edit' ? (
                <ResumeEditor 
                  template={templates.find(t => t.id === selectedTemplateId)}
                  onGenerate={handleDataUpdate} // We treat generate as 'update data' here
                  isGenerating={false}
                  initialData={resumeData}
                />
              ) : (
                <CustomizationPanel 
                  settings={settings}
                  onUpdate={handleSettingUpdate}
                  templates={templates}
                  selectedTemplateId={selectedTemplateId}
                  onSelectTemplate={(t) => setSelectedTemplateId(t.id)}
                />
              )}
            </div>
          </div>

          {/* Right Area - Preview */}
          <div className="flex-1 bg-slate-950 p-8 overflow-y-auto flex items-start justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[210mm] shadow-2xl"
            >
              {/* A4 Paper Container */}
              <div 
                id="resume-preview" 
                ref={previewRef}
                className="bg-white aspect-[1/1.4142] w-full origin-top transform transition-transform"
              >
                <ResumePreview 
                  data={resumeData}
                  templateId={selectedTemplateId}
                  settings={settings}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AutoGenerator 
        open={autoGenOpen} 
        onOpenChange={setAutoGenOpen}
        onGenerate={handleAutoGenerate}
      />
    </>
  );
};

export default GeneratorPage;