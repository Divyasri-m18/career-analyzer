import express from "express";
import cors from "cors";
import multer from "multer";
import mammoth from "mammoth";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const upload = multer();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* -------- ROOT CHECK (ADDED) -------- */
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully");
});

/* -------- Resume Upload & Parse -------- */
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filename = file.originalname.toLowerCase();
    let text = "";

    if (filename.endsWith(".pdf")) {
      const data = await pdfParse(file.buffer);
      text = data.text;
    } 
    else if (filename.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value;
    } 
    else if (filename.endsWith(".txt")) {
      text = file.buffer.toString("utf-8");
    } 
    else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File parsing failed" });
  }
});

/* -------- Save Analysis -------- */
app.post("/save", async (req, res) => {
  try {
    const { name, skills, domains, score } = req.body;

    const result = await prisma.analysis.create({
      data: {
        name,
        skills: JSON.stringify(skills),
        domains: JSON.stringify(domains),
        score,
      },
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Save failed" });
  }
});

/* -------- History -------- */
app.get("/history", async (req, res) => {
  try {
    const history = await prisma.analysis.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
