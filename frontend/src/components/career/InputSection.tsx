import React, { useRef } from 'react';

interface InputSectionProps {
  resumeText: string;
  name: string;
  onResumeChange: (text: string) => void;
  onNameChange: (name: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  onTrySample: () => void;
  isAnalyzing: boolean;
  // New props for file upload
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
}

// Demo placeholder text for unsupported file types (.pdf, .docx)

/**
 * Reads a text file using the browser FileReader API
 * Returns the file content as a string
 */

/**
 * Gets file extension from filename
 */
const InputSection: React.FC<InputSectionProps> = ({
  resumeText,
  name,
  onResumeChange,
  onNameChange,
  onAnalyze,
  onClear,
  onTrySample,
  isAnalyzing,
  selectedFile,
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles file selection from the input
   * - .txt files: Read content using FileReader
   * - .pdf/.docx files: Show demo placeholder text
   */
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  onFileSelect(file);

  const formData = new FormData();
  formData.append("resume", file);

  try {
    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.text) {
      onResumeChange(data.text);
    } else {
      onResumeChange("Failed to extract text from file");
    }
  } catch (err) {
    console.error(err);
    onResumeChange("Error uploading or reading file");
  }
};

  /**
   * Clears textarea, file input, and all related state
   */
  const handleClear = () => {
    onClear();
    onFileSelect(null);
    // Reset the file input element
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="input-section">
      <div className="input-group">
        <label className="input-label" htmlFor="name-input">
          Your Name (optional)
        </label>
        <input
          id="name-input"
          type="text"
          className="text-input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>

      {/* File Upload Section */}
      <div className="input-group">
        <label className="input-label" htmlFor="file-input">
          Upload Resume File
        </label>
        <div className="file-upload-wrapper">
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            className="file-input"
            accept=".txt,.pdf,.docx"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="file-upload-button">
            <span>📁</span>
            Choose File
          </label>
          {selectedFile && (
            <span className="file-name">
              {selectedFile.name}
            </span>
          )}
        </div>
        <p className="file-hint">
          Supports .txt (full read), .pdf and .docx (demo mode)
        </p>
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="resume-input">
          Paste your resume or list your skills
        </label>
        <textarea
          id="resume-input"
          className="text-input textarea-input"
          placeholder="Paste your resume text here, or list your skills and experience...

Example:
- Python, JavaScript, TypeScript
- React, Node.js, Django
- AWS, Docker, Kubernetes
- 3 years of software development experience"
          value={resumeText}
          onChange={(e) => onResumeChange(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={onAnalyze}
          disabled={!resumeText.trim() || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <span className="loading-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
              Analyzing...
            </>
          ) : (
            <>
              <span>✨</span>
              Analyze
            </>
          )}
        </button>

        <button className="btn btn-secondary" onClick={handleClear}>
          <span>🗑️</span>
          Clear
        </button>

        <button className="btn btn-outline" onClick={onTrySample}>
          <span>📄</span>
          Try Sample
        </button>
      </div>
    </section>
  );
};

export default InputSection;
