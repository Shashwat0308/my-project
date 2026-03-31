import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import HomePage from '@/pages/HomePage';
import AnalyzerPage from '@/pages/AnalyzerPage';
import GeneratorPage from '@/pages/GeneratorPage';
import CoverLetterPage from '@/pages/CoverLetterPage';
import AnalyticsPage from '@/pages/AnalyticsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyzer" element={<AnalyzerPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/cover-letter" element={<CoverLetterPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;