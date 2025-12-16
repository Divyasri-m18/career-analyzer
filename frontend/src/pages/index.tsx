import React, { useState } from 'react';
import InputSection from '../components/career/InputSection';
import ResultsSection from '../components/career/ResultsSection';
import { analyzeResume, SAMPLE_RESUME, type AnalysisResult } from '../utils/skillAnalyzer';
import '../styles/career-analyzer.css';

const Index: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // State for tracking uploaded file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const analysisResult = analyzeResume(resumeText);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setResumeText('');
    setSelectedFile(null);
    setName('');
    setResult(null);
  };

  const handleTrySample = () => {
    setResumeText(SAMPLE_RESUME.trim());
    setName('John Doe');
  };

  return (
    <div className="career-analyzer">
      <div className="analyzer-container">
        <header className="analyzer-header">
          <h1 className="analyzer-title">AI Career & Skill Analyzer</h1>
          <p className="analyzer-subtitle">
            Paste your resume to discover your technical strengths, career matches, and personalized project recommendations.
          </p>
        </header>

        <InputSection
          resumeText={resumeText}
          name={name}
          onResumeChange={setResumeText}
          onNameChange={setName}
          onAnalyze={handleAnalyze}
          onClear={handleClear}
          onTrySample={handleTrySample}
          isAnalyzing={isAnalyzing}
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
        />

        {isAnalyzing && (
          <div className="loading">
            <div className="loading-spinner" />
          </div>
        )}

        {result && !isAnalyzing && (
          <ResultsSection result={result} name={name} />
        )}

        {!result && !isAnalyzing && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3 className="empty-title">Ready to analyze your skills</h3>
            <p className="empty-subtitle">
              Enter your resume or skills above, or try the sample to see how it works.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
