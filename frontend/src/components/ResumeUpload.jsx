import { useState } from "react";
import API from "../api";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const uploadResume = async () => {
    if (!file) return alert("Upload a resume");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setText(res.data.text);
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadResume}>Upload</button>

      {text && (
        <textarea rows="10" cols="60" value={text} readOnly />
      )}
    </div>
  );
}

export default ResumeUpload;
