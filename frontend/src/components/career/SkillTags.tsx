import React from 'react';
import type { Skill, SkillCategory } from '../../utils/skillAnalyzer';

interface SkillTagsProps {
  skills: Skill[];
}

const categoryLabels: Record<SkillCategory, string> = {
  language: 'Language',
  framework: 'Framework',
  database: 'Database',
  cloud: 'Cloud',
  devops: 'DevOps',
  'ai-ml': 'AI/ML',
  tool: 'Tool',
  soft: 'Soft Skill',
};

const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => {
  if (skills.length === 0) {
    return (
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        No skills detected. Try adding more details to your resume.
      </p>
    );
  }

  const highlightCategories: SkillCategory[] = ['language', 'framework', 'ai-ml'];

  return (
    <div className="skill-tags">
      {skills.map((skill) => (
        <span
          key={skill.name}
          className={`skill-tag ${highlightCategories.includes(skill.category) ? 'highlight' : ''}`}
          title={categoryLabels[skill.category]}
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
};

export default SkillTags;
