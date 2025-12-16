export interface Skill {
  name: string;
  category: SkillCategory;
  weight: number;
}

export type SkillCategory = 
  | 'language'
  | 'framework'
  | 'database'
  | 'cloud'
  | 'devops'
  | 'ai-ml'
  | 'tool'
  | 'soft';

export interface Domain {
  name: string;
  icon: string;
  matchScore: number;
  requiredSkills: string[];
}

export interface Project {
  title: string;
  description: string;
  relevantSkills: string[];
}

export interface AnalysisResult {
  skills: Skill[];
  domains: Domain[];
  score: number;
  projects: Project[];
  breakdown: {
    technicalSkills: number;
    toolsExperience: number;
    domainBreadth: number;
  };
}

// Skill definitions with keywords
const SKILL_KEYWORDS: Record<string, { category: SkillCategory; weight: number; aliases: string[] }> = {
  // Programming Languages
  'Python': { category: 'language', weight: 10, aliases: ['python', 'py', 'python3'] },
  'JavaScript': { category: 'language', weight: 10, aliases: ['javascript', 'js', 'es6', 'ecmascript'] },
  'TypeScript': { category: 'language', weight: 10, aliases: ['typescript', 'ts'] },
  'Java': { category: 'language', weight: 9, aliases: ['java', 'jvm'] },
  'C++': { category: 'language', weight: 8, aliases: ['c++', 'cpp', 'cplusplus'] },
  'C#': { category: 'language', weight: 8, aliases: ['c#', 'csharp', '.net core'] },
  'Go': { category: 'language', weight: 8, aliases: ['go', 'golang'] },
  'Rust': { category: 'language', weight: 8, aliases: ['rust', 'rustlang'] },
  'Ruby': { category: 'language', weight: 7, aliases: ['ruby', 'rb'] },
  'PHP': { category: 'language', weight: 6, aliases: ['php'] },
  'Swift': { category: 'language', weight: 7, aliases: ['swift', 'ios development'] },
  'Kotlin': { category: 'language', weight: 7, aliases: ['kotlin', 'android development'] },
  'Scala': { category: 'language', weight: 7, aliases: ['scala'] },
  'R': { category: 'language', weight: 6, aliases: ['r programming', 'r language', 'rstudio'] },
  
  // Frameworks & Libraries
  'React': { category: 'framework', weight: 10, aliases: ['react', 'reactjs', 'react.js'] },
  'Angular': { category: 'framework', weight: 8, aliases: ['angular', 'angularjs'] },
  'Vue': { category: 'framework', weight: 8, aliases: ['vue', 'vuejs', 'vue.js'] },
  'Node.js': { category: 'framework', weight: 9, aliases: ['node', 'nodejs', 'node.js'] },
  'Express': { category: 'framework', weight: 7, aliases: ['express', 'expressjs'] },
  'Django': { category: 'framework', weight: 8, aliases: ['django'] },
  'Flask': { category: 'framework', weight: 6, aliases: ['flask'] },
  'Spring': { category: 'framework', weight: 8, aliases: ['spring', 'spring boot', 'springboot'] },
  'Next.js': { category: 'framework', weight: 8, aliases: ['next', 'nextjs', 'next.js'] },
  'FastAPI': { category: 'framework', weight: 7, aliases: ['fastapi'] },
  'Rails': { category: 'framework', weight: 7, aliases: ['rails', 'ruby on rails'] },
  'Laravel': { category: 'framework', weight: 6, aliases: ['laravel'] },
  
  // Databases
  'SQL': { category: 'database', weight: 9, aliases: ['sql', 'mysql', 'postgresql', 'postgres', 'mssql'] },
  'MongoDB': { category: 'database', weight: 8, aliases: ['mongodb', 'mongo'] },
  'Redis': { category: 'database', weight: 7, aliases: ['redis'] },
  'Elasticsearch': { category: 'database', weight: 7, aliases: ['elasticsearch', 'elastic'] },
  'GraphQL': { category: 'database', weight: 7, aliases: ['graphql'] },
  'DynamoDB': { category: 'database', weight: 6, aliases: ['dynamodb'] },
  'Cassandra': { category: 'database', weight: 6, aliases: ['cassandra'] },
  
  // Cloud & Infrastructure
  'AWS': { category: 'cloud', weight: 10, aliases: ['aws', 'amazon web services', 'ec2', 's3', 'lambda'] },
  'Azure': { category: 'cloud', weight: 9, aliases: ['azure', 'microsoft azure'] },
  'GCP': { category: 'cloud', weight: 9, aliases: ['gcp', 'google cloud', 'google cloud platform'] },
  'Terraform': { category: 'cloud', weight: 8, aliases: ['terraform', 'iac'] },
  'Kubernetes': { category: 'cloud', weight: 9, aliases: ['kubernetes', 'k8s'] },
  
  // DevOps & Tools
  'Docker': { category: 'devops', weight: 9, aliases: ['docker', 'containers', 'containerization'] },
  'Git': { category: 'tool', weight: 8, aliases: ['git', 'github', 'gitlab', 'bitbucket'] },
  'CI/CD': { category: 'devops', weight: 8, aliases: ['ci/cd', 'cicd', 'jenkins', 'github actions', 'gitlab ci'] },
  'Linux': { category: 'tool', weight: 7, aliases: ['linux', 'ubuntu', 'centos', 'bash', 'shell'] },
  'Agile': { category: 'soft', weight: 6, aliases: ['agile', 'scrum', 'kanban', 'sprint'] },
  
  // AI/ML
  'Machine Learning': { category: 'ai-ml', weight: 10, aliases: ['machine learning', 'ml', 'deep learning', 'neural network'] },
  'TensorFlow': { category: 'ai-ml', weight: 9, aliases: ['tensorflow', 'tf'] },
  'PyTorch': { category: 'ai-ml', weight: 9, aliases: ['pytorch'] },
  'NLP': { category: 'ai-ml', weight: 8, aliases: ['nlp', 'natural language processing', 'text analysis'] },
  'Computer Vision': { category: 'ai-ml', weight: 8, aliases: ['computer vision', 'opencv', 'image recognition'] },
  'Data Science': { category: 'ai-ml', weight: 9, aliases: ['data science', 'data analysis', 'pandas', 'numpy'] },
};

// Domain definitions
const DOMAIN_DEFINITIONS: Omit<Domain, 'matchScore'>[] = [
  {
    name: 'Full Stack Development',
    icon: '🌐',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'MongoDB'],
  },
  {
    name: 'Frontend Engineering',
    icon: '🎨',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'CSS'],
  },
  {
    name: 'Backend Engineering',
    icon: '⚙️',
    requiredSkills: ['Python', 'Java', 'Node.js', 'SQL', 'MongoDB', 'Go'],
  },
  {
    name: 'Data Science & Analytics',
    icon: '📊',
    requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Science'],
  },
  {
    name: 'Machine Learning Engineering',
    icon: '🤖',
    requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'NLP'],
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    requiredSkills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    name: 'Mobile Development',
    icon: '📱',
    requiredSkills: ['Swift', 'Kotlin', 'React', 'JavaScript', 'TypeScript'],
  },
];

// Project suggestions based on skills
const PROJECT_TEMPLATES: { skills: string[]; project: Omit<Project, 'relevantSkills'> & { skills: string[] } }[] = [
  {
    skills: ['React', 'TypeScript', 'Node.js'],
    project: {
      title: 'Real-time Collaboration Dashboard',
      description: 'Build a collaborative workspace with live updates, user presence, and real-time data sync.',
      skills: ['React', 'TypeScript', 'Node.js', 'WebSocket'],
    },
  },
  {
    skills: ['Python', 'Machine Learning'],
    project: {
      title: 'Sentiment Analysis API',
      description: 'Create a REST API that analyzes text sentiment using NLP techniques and ML models.',
      skills: ['Python', 'Machine Learning', 'NLP', 'FastAPI'],
    },
  },
  {
    skills: ['AWS', 'Docker', 'Kubernetes'],
    project: {
      title: 'Auto-scaling Microservices Platform',
      description: 'Design and deploy a containerized microservices architecture with auto-scaling capabilities.',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    },
  },
  {
    skills: ['SQL', 'Python', 'Data Science'],
    project: {
      title: 'Business Intelligence Dashboard',
      description: 'Develop an interactive analytics dashboard with data visualization and automated reporting.',
      skills: ['Python', 'SQL', 'Data Science', 'React'],
    },
  },
  {
    skills: ['JavaScript', 'React'],
    project: {
      title: 'Progressive Web Application',
      description: 'Build an offline-capable PWA with service workers, push notifications, and responsive design.',
      skills: ['JavaScript', 'React', 'TypeScript'],
    },
  },
  {
    skills: ['Go', 'Docker'],
    project: {
      title: 'High-Performance API Gateway',
      description: 'Create a lightweight API gateway with rate limiting, caching, and request routing.',
      skills: ['Go', 'Docker', 'Redis'],
    },
  },
  {
    skills: ['TensorFlow', 'Computer Vision'],
    project: {
      title: 'Image Classification Service',
      description: 'Build a deep learning model to classify images with a user-friendly web interface.',
      skills: ['Python', 'TensorFlow', 'Computer Vision', 'React'],
    },
  },
  {
    skills: ['MongoDB', 'Node.js'],
    project: {
      title: 'RESTful API with Authentication',
      description: 'Design a secure REST API with JWT authentication, role-based access, and CRUD operations.',
      skills: ['Node.js', 'MongoDB', 'Express', 'TypeScript'],
    },
  },
];

// Parse skills from text
export function parseSkills(text: string): Skill[] {
  const normalizedText = text.toLowerCase();
  const detectedSkills: Skill[] = [];
  const seenSkills = new Set<string>();

  for (const [skillName, config] of Object.entries(SKILL_KEYWORDS)) {
    const allPatterns = [skillName.toLowerCase(), ...config.aliases];
    
    for (const pattern of allPatterns) {
      // Use word boundary matching
      const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      
      if (regex.test(normalizedText) && !seenSkills.has(skillName)) {
        seenSkills.add(skillName);
        detectedSkills.push({
          name: skillName,
          category: config.category,
          weight: config.weight,
        });
        break;
      }
    }
  }

  // Sort by weight descending
  return detectedSkills.sort((a, b) => b.weight - a.weight);
}

// Match domains based on skills
export function matchDomains(skills: Skill[]): Domain[] {
  const skillNames = new Set(skills.map(s => s.name));
  
  const matchedDomains = DOMAIN_DEFINITIONS.map(domain => {
    const matchingSkills = domain.requiredSkills.filter(s => skillNames.has(s));
    const matchScore = Math.round((matchingSkills.length / domain.requiredSkills.length) * 100);
    
    return {
      ...domain,
      matchScore,
    };
  });

  // Filter domains with at least 20% match and sort by score
  return matchedDomains
    .filter(d => d.matchScore >= 20)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}

// Calculate resume score
export function calculateScore(skills: Skill[], domains: Domain[]): { score: number; breakdown: AnalysisResult['breakdown'] } {
  // Technical skills score (max 40 points)
  const languageCount = skills.filter(s => s.category === 'language').length;
  const frameworkCount = skills.filter(s => s.category === 'framework').length;
  const technicalSkills = Math.min(40, (languageCount * 5) + (frameworkCount * 5));

  // Tools experience score (max 30 points)
  const toolCategories = ['database', 'cloud', 'devops', 'tool'];
  const toolCount = skills.filter(s => toolCategories.includes(s.category)).length;
  const toolsExperience = Math.min(30, toolCount * 6);

  // Domain breadth score (max 30 points)
  const domainBreadth = Math.min(30, domains.reduce((acc, d) => acc + (d.matchScore * 0.3), 0));

  const totalScore = Math.round(technicalSkills + toolsExperience + domainBreadth);

  return {
    score: Math.min(100, totalScore),
    breakdown: {
      technicalSkills: Math.round(technicalSkills),
      toolsExperience: Math.round(toolsExperience),
      domainBreadth: Math.round(domainBreadth),
    },
  };
}

// Suggest projects based on skills
export function suggestProjects(skills: Skill[]): Project[] {
  const skillNames = new Set(skills.map(s => s.name));
  
  const scoredProjects = PROJECT_TEMPLATES.map(template => {
    const matchCount = template.skills.filter(s => skillNames.has(s)).length;
    return {
      ...template,
      matchScore: matchCount / template.skills.length,
    };
  });

  // Get top 4 matching projects
  return scoredProjects
    .filter(p => p.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4)
    .map(p => ({
      title: p.project.title,
      description: p.project.description,
      relevantSkills: p.project.skills,
    }));
}

// Main analysis function
export function analyzeResume(text: string): AnalysisResult {
  const skills = parseSkills(text);
  const domains = matchDomains(skills);
  const { score, breakdown } = calculateScore(skills, domains);
  const projects = suggestProjects(skills);

  return {
    skills,
    domains,
    score,
    projects,
    breakdown,
  };
}

// Sample resume text
export const SAMPLE_RESUME = `
John Doe - Senior Software Engineer

Summary:
Experienced Full Stack Developer with 5+ years of experience building scalable web applications.
Strong background in cloud architecture and DevOps practices.

Technical Skills:
- Languages: Python, JavaScript, TypeScript, Java, SQL
- Frontend: React, Next.js, HTML5, CSS3
- Backend: Node.js, Express, Django, FastAPI
- Databases: PostgreSQL, MongoDB, Redis
- Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes
- Tools: Git, CI/CD, Terraform, Linux

Experience:
- Led development of microservices architecture serving 1M+ users
- Implemented machine learning pipeline for real-time data analysis
- Built and maintained CI/CD pipelines using GitHub Actions
- Designed RESTful APIs and GraphQL endpoints

Education:
BS in Computer Science

Certifications:
- AWS Solutions Architect
- Kubernetes Administrator (CKA)
`;
