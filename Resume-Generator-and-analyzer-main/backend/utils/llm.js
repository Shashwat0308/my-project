import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn("⚠️  OPENAI_API_KEY is not set in environment variables. LLM features will fail until it is configured.");
}

const client = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null;

function extractionPrompt(text) {
  return `You are a resume parser. Extract structured information from the resume and return ONLY a valid JSON object with NO markdown formatting, NO code blocks, NO explanatory text.

Return this exact JSON structure:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number",
  "summary": "professional summary",
  "skills": ["skill1", "skill2"],
  "experience": [{"job_title": "title", "company": "company", "start": "date", "end": "date", "responsibilities": ["resp1"]}],
  "education": [{"degree": "degree", "institution": "school", "year": "year"}],
  "projects": [],
  "certifications": [],
  "languages": [],
  "suggested_improvements": ["improvement1", "improvement2"]
}

Resume text:
"""${text}"""

Return ONLY the JSON object, nothing else.`;
}

export async function generateStructuredResume(text) {
  if (!client) {
    throw new Error("OPENAI_API_KEY is not configured. Please add it to backend/.env or set it in your environment.");
  }

  const resp = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: extractionPrompt(text) }],
    max_tokens: 1500,
    temperature: 0
  });

  const content = resp.choices?.[0]?.message?.content || "";
  console.log("🤖 Raw LLM response:", content.substring(0, 200));

  try {
    // Remove markdown code blocks (```json ... ```)
    let cleaned = content.trim();
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    
    // Find the first { and last }
    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");
    
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error("❌ No valid JSON found in LLM response");
      return { error: "Invalid JSON", llm_output: content };
    }
    
    const jsonStr = cleaned.slice(jsonStart, jsonEnd + 1);
    console.log("✅ Extracted JSON string:", jsonStr.substring(0, 100));
    
    const parsed = JSON.parse(jsonStr);
    console.log("✅ Successfully parsed JSON with keys:", Object.keys(parsed));
    return parsed;
  } catch (e) {
    console.error("❌ JSON parse error:", e.message);
    console.error("❌ Content was:", content);
    return { error: "Invalid JSON", llm_output: content };
  }
}
