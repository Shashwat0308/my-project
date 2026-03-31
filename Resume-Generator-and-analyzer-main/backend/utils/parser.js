import pdf from "pdf-parse";
import mammoth from "mammoth";
import path from "path";

export async function extractTextFromBuffer(filename, buffer) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".pdf") {
    const data = await pdf(buffer);
    return sanitizeText(data.text || "");
  }
  if (ext === ".docx") {
    const res = await mammoth.extractRawText({ buffer });
    return sanitizeText(res.value || "");
  }
  return sanitizeText(buffer.toString("utf-8"));
}

function sanitizeText(txt) {
  return txt.replace(/\r/g, " ").replace(/\n{2,}/g, "\n").trim();
}
