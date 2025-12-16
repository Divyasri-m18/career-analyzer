import React from 'react';
import type { Domain } from '../../utils/skillAnalyzer';

interface DomainCardsProps {
  domains: Domain[];
}

const DomainCards: React.FC<DomainCardsProps> = ({ domains }) => {
  if (domains.length === 0) {
    return (
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Add more skills to see career domain matches.
      </p>
    );
  }

  return (
    <div className="domain-list">
      {domains.map((domain) => (
        <div key={domain.name} className="domain-item">
          <span className="domain-icon">{domain.icon}</span>
          <span className="domain-name">{domain.name}</span>
          <span className="domain-match">{domain.matchScore}% match</span>
        </div>
      ))}
    </div>
  );
};

export default DomainCards;
