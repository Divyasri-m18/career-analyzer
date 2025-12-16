import React, { useEffect, useState } from 'react';
import type { AnalysisResult } from '../../utils/skillAnalyzer';

interface ScoreBarProps {
  score: number;
  breakdown: AnalysisResult['breakdown'];
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, breakdown }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate score from 0 to actual value
    const duration = 800;
    const steps = 30;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Strong';
    if (score >= 40) return 'Moderate';
    if (score >= 20) return 'Developing';
    return 'Entry Level';
  };

  return (
    <div className="score-container">
      <div className="score-value">{animatedScore}</div>
      <p className="score-label">{getScoreLabel(score)} Profile</p>
      
      <div className="score-bar-wrapper">
        <div
          className="score-bar-fill"
          style={{ width: `${animatedScore}%` }}
        />
      </div>

      <div className="score-breakdown">
        <div className="breakdown-item">
          <div className="breakdown-value">{breakdown.technicalSkills}</div>
          <div className="breakdown-label">Technical</div>
        </div>
        <div className="breakdown-item">
          <div className="breakdown-value">{breakdown.toolsExperience}</div>
          <div className="breakdown-label">Tools</div>
        </div>
        <div className="breakdown-item">
          <div className="breakdown-value">{breakdown.domainBreadth}</div>
          <div className="breakdown-label">Breadth</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBar;
