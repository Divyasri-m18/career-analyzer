import React from 'react';
import type { AnalysisResult } from '../../utils/skillAnalyzer';
import SkillTags from './SkillTags';
import DomainCards from './DomainCards';
import ScoreBar from './ScoreBar';
import ProjectList from './ProjectList';

interface ResultsSectionProps {
  result: AnalysisResult;
  name: string;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result, name }) => {
  const displayName = name.trim() || 'Your';

  return (
    <section className="results-section">
      <div className="results-grid">
        <div className="result-card">
          <div className="card-header">
            <div className="card-icon">💼</div>
            <h3 className="card-title">Detected Skills ({result.skills.length})</h3>
          </div>
          <SkillTags skills={result.skills} />
        </div>

        <div className="result-card">
          <div className="card-header">
            <div className="card-icon">🎯</div>
            <h3 className="card-title">{displayName === 'Your' ? 'Your' : `${displayName}'s`} Career Matches</h3>
          </div>
          <DomainCards domains={result.domains} />
        </div>

        <div className="result-card">
          <div className="card-header">
            <div className="card-icon">📈</div>
            <h3 className="card-title">Resume Score</h3>
          </div>
          <ScoreBar score={result.score} breakdown={result.breakdown} />
        </div>

        <div className="result-card">
          <div className="card-header">
            <div className="card-icon">🚀</div>
            <h3 className="card-title">Suggested Projects</h3>
          </div>
          <ProjectList projects={result.projects} />
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
