AI Career & Skill Analyzer

A full-stack web application that analyzes resumes to identify technical skills, career domains, and personalized project recommendations using rule-based intelligence and structured analysis.

🌐 Live Demo: (add deployed link)
📦 Repository: Career Analyzer

Overview

The AI Career & Skill Analyzer helps students and early-career professionals understand their technical profile by analyzing resume content.
It extracts skills, evaluates domain strength, and suggests relevant projects to improve career readiness.

Key Features

Resume upload support (.pdf, .docx, .txt)

Automatic skill extraction and categorization

Career domain matching with score visualization

Personalized project recommendations

Resume analysis history stored in database

Clean, responsive, modern UI

Tech Stack

Frontend

React (Vite)

TypeScript

Tailwind CSS

shadcn/ui

Axios

Backend

Node.js

Express.js

Prisma ORM

SQLite

Multer (file handling)

Deployment

Frontend: Vercel

Backend: Node server

Architecture

Frontend handles resume input, file upload, and visualization

Backend parses uploaded files and stores analysis results

Prisma ORM manages structured data in SQLite

REST APIs connect frontend and backend

Project Structure
career-analyzer/
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── utils/
├── backend/
│   ├── prisma/
│   ├── server.js
│   └── package.json
└── README.md

How It Works

User uploads resume or pastes skill content

Resume text is processed and analyzed

Skills are categorized and scored

Career domains and project suggestions are generated

Results are displayed with clean visual insights

Use Cases

Students exploring career paths

Freshers analyzing resume strengths

Portfolio and academic full-stack project

Skill self-assessment tool
