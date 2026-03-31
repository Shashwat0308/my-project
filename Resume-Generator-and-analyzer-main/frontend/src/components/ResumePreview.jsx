import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ResumePreview = ({ data, templateId, settings }) => {
  // Styles based on settings
  const containerStyle = {
    fontFamily: settings.font,
    fontSize: `${settings.fontSize}px`,
    lineHeight: settings.spacing === 'compact' ? 1.4 : settings.spacing === 'spacious' ? 1.8 : 1.6,
    color: '#1f2937', // gray-900
  };

  const headerColor = settings.color;
  
  const spacingClass = {
    compact: 'gap-3 mb-3',
    normal: 'gap-5 mb-5',
    spacious: 'gap-8 mb-8',
  }[settings.spacing];

  const sectionSpacing = {
    compact: 'mb-4',
    normal: 'mb-6',
    spacious: 'mb-8',
  }[settings.spacing];

  // Helper for Layout Rendering
  const TwoColumnLayout = ({ left, right }) => (
    <div className="grid grid-cols-[30%_70%] h-full min-h-[1000px]">
      <div className="bg-slate-50 p-6 border-r border-gray-200" style={{ borderColor: `${headerColor}20` }}>
        {left}
      </div>
      <div className="p-6 bg-white">
        {right}
      </div>
    </div>
  );

  const SingleColumnLayout = ({ children }) => (
    <div className="p-8 bg-white h-full min-h-[1000px]">
      {children}
    </div>
  );

  const SectionTitle = ({ children }) => (
    <h3 
      className={`font-bold border-b-2 mb-3 pb-1 ${settings.uppercaseHeaders ? 'uppercase tracking-wider' : ''}`}
      style={{ color: headerColor, borderColor: `${headerColor}40`, fontSize: '1.1em' }}
    >
      {children}
    </h3>
  );

  // --- RENDER CONTENT HELPERS ---
  const renderContact = () => (
    <div className={`flex flex-wrap gap-3 text-sm text-gray-600 ${sectionSpacing}`}>
      {data.email && <div className="flex items-center gap-1"><Mail size={12} /> {data.email}</div>}
      {data.phone && <div className="flex items-center gap-1"><Phone size={12} /> {data.phone}</div>}
      {data.location && <div className="flex items-center gap-1"><MapPin size={12} /> {data.location}</div>}
    </div>
  );

  const renderSummary = () => (
    <div className={sectionSpacing}>
      <SectionTitle>Profile</SectionTitle>
      <p className="text-gray-700 text-sm">{data.summary || "Professional summary goes here..."}</p>
    </div>
  );

  const renderSkills = () => (
    <div className={sectionSpacing}>
      <SectionTitle>Skills</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {data.skills ? data.skills.split(',').map(s => (
          <span key={s} className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-700">
            {s.trim()}
          </span>
        )) : <span className="text-gray-400 italic">List your skills...</span>}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className={sectionSpacing}>
      <SectionTitle>Experience</SectionTitle>
      <div className="whitespace-pre-line text-sm text-gray-700">
        {data.experience || "Work experience timeline..."}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className={sectionSpacing}>
      <SectionTitle>Education</SectionTitle>
      <div className="whitespace-pre-line text-sm text-gray-700">
        {data.education || "Education details..."}
      </div>
    </div>
  );

  // --- TEMPLATE RENDERERS ---

  // 1. MODERN (Header bar, 2 column optional)
  if (templateId === 'modern') {
    const content = (
      <>
        {renderSummary()}
        {renderExperience()}
        {renderEducation()}
        {renderSkills()}
      </>
    );

    return (
      <div style={containerStyle} className="w-full h-full bg-white shadow-lg overflow-hidden">
        <div className="p-8 text-white" style={{ backgroundColor: headerColor }}>
          <h1 className="text-4xl font-bold mb-2">{data.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap gap-4 text-white/90 text-sm">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>• {data.phone}</span>}
            {data.location && <span>• {data.location}</span>}
          </div>
        </div>
        {settings.columns === 2 ? (
          <div className="grid grid-cols-[30%_70%] min-h-[800px]">
             <div className="p-6 bg-gray-50 space-y-6 border-r">
                {renderSkills()}
                <div className={sectionSpacing}>
                  <SectionTitle>Contact</SectionTitle>
                  <div className="text-sm space-y-2">
                    <div>{data.email}</div>
                    <div>{data.phone}</div>
                    <div>{data.location}</div>
                  </div>
                </div>
             </div>
             <div className="p-6">
                {renderSummary()}
                {renderExperience()}
                {renderEducation()}
             </div>
          </div>
        ) : (
          <div className="p-8">{content}</div>
        )}
      </div>
    );
  }

  // 2. MINIMAL (Clean, centered header, whitespace)
  if (templateId === 'minimal') {
    return (
      <div style={containerStyle} className="w-full h-full bg-white p-10 shadow-lg">
        <div className="text-center mb-8 border-b pb-6" style={{ borderColor: headerColor }}>
          <h1 className="text-3xl font-light tracking-tight mb-3 text-gray-900 uppercase">{data.fullName || "Your Name"}</h1>
          <div className="flex justify-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
          </div>
        </div>
        {settings.columns === 2 ? (
           <div className="grid grid-cols-2 gap-10">
             <div>
               {renderSummary()}
               {renderExperience()}
             </div>
             <div>
               {renderSkills()}
               {renderEducation()}
             </div>
           </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {renderSummary()}
            {renderExperience()}
            {renderSkills()}
            {renderEducation()}
          </div>
        )}
      </div>
    );
  }

  // 3. CREATIVE (Left sidebar with color)
  if (templateId === 'creative') {
    return (
      <div style={containerStyle} className="w-full h-full bg-white shadow-lg flex min-h-[1000px]">
        <div className="w-1/3 text-white p-8 flex flex-col gap-6" style={{ backgroundColor: headerColor }}>
          <div className="mb-4">
             <div className="w-24 h-24 bg-white/20 rounded-full mb-4 mx-auto backdrop-blur-sm"></div>
             <h1 className="text-2xl font-bold text-center">{data.fullName}</h1>
          </div>
          
          <div className="space-y-4 text-white/90 text-sm">
            <div className="border-b border-white/20 pb-1 mb-2 font-bold uppercase opacity-70">Contact</div>
            <div className="break-words">{data.email}</div>
            <div>{data.phone}</div>
            <div>{data.location}</div>
          </div>

          <div className="space-y-2">
             <div className="border-b border-white/20 pb-1 mb-2 font-bold uppercase opacity-70">Skills</div>
             <div className="flex flex-wrap gap-2">
                {data.skills && data.skills.split(',').map(s => (
                  <span key={s} className="bg-white/10 px-2 py-1 rounded text-xs">{s.trim()}</span>
                ))}
             </div>
          </div>
        </div>
        <div className="w-2/3 p-8">
          <div className="mb-8">
             <h3 className="text-xl font-bold mb-2" style={{color: headerColor}}>Profile</h3>
             <p className="text-gray-600">{data.summary}</p>
          </div>
          <div className="mb-8">
             <h3 className="text-xl font-bold mb-4 border-b pb-2" style={{color: headerColor}}>Experience</h3>
             <div className="whitespace-pre-line text-gray-700">{data.experience}</div>
          </div>
          <div>
             <h3 className="text-xl font-bold mb-4 border-b pb-2" style={{color: headerColor}}>Education</h3>
             <div className="whitespace-pre-line text-gray-700">{data.education}</div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT / PROFESSIONAL
  return (
    <div style={containerStyle} className="w-full h-full bg-white p-10 shadow-lg">
      <div className="flex justify-between items-start border-b-4 pb-6 mb-8" style={{ borderColor: headerColor }}>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fullName || "Your Name"}</h1>
          <p className="text-xl text-gray-600">{data.summary?.split('.')[0] || "Professional Title"}</p>
        </div>
        <div className="text-right text-sm text-gray-600 space-y-1">
          <div>{data.email}</div>
          <div>{data.phone}</div>
          <div>{data.location}</div>
        </div>
      </div>
      
      {renderSummary()}
      
      <div className="grid gap-8">
        {renderExperience()}
        <div className="grid grid-cols-2 gap-8">
          {renderEducation()}
          {renderSkills()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;