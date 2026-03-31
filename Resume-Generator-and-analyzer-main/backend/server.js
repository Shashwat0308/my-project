import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import { extractTextFromBuffer } from "./utils/parser.js";
import { generateStructuredResume } from "./utils/llm.js";
import { calculateATSScore, calculateMatches } from "./utils/ats.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.post("/api/parse-resume", upload.single("resume"), async (req, res) => {
  try {
    console.log("📤 Received resume upload request");
    console.log("   File:", req.file?.originalname, "Size:", req.file?.size);
    
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("📄 Extracting text from file...");
    const text = await extractTextFromBuffer(req.file.originalname, req.file.buffer);
    console.log("✅ Text extracted, length:", text.length);

    console.log("🤖 Generating structured resume with LLM...");
    const structured = await generateStructuredResume(text);
    console.log("✅ Structured data generated:", Object.keys(structured));

    const ats_score = calculateATSScore(structured);
    const matches = calculateMatches(structured);

    const response = {
      parsed: structured,
      ats_score,
      matches
    };
    
    console.log("📦 Sending response:");
    console.log("   Name:", structured.name);
    console.log("   Email:", structured.email);
    console.log("   Skills:", structured.skills?.length || 0);
    console.log("   ATS Score:", ats_score);
    
    res.json(response);
  } catch (err) {
    console.error("❌ Error processing resume:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

function startServer(listenPort) {
  const server = app.listen(listenPort, () => {
    console.log(`Resume parser running on port ${listenPort}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${listenPort} is already in use.`);
      if (!process.env.PORT && listenPort < 5010) {
        const nextPort = listenPort + 1;
        console.warn(`⚠️ Trying fallback port ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error("Please stop the process using this port or set a different PORT in your .env file.");
        process.exit(1);
      }
    } else {
      console.error("Server error:", err);
      process.exit(1);
    }
  });
}

startServer(port);
