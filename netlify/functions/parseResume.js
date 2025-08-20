import pdfParse from "pdf-parse";
import { readFileSync } from "fs";
import { Document, Packer } from "docx";
import mammoth from "mammoth"; // for .docx text extraction

export async function parseResumeFile(buffer) {
  try {
    // Try PDF first
    const pdfData = await pdfParse(buffer);
    if (pdfData.text.trim()) return pdfData.text;
  } catch {}

  try {
    // Try DOCX
    const docxText = await mammoth.extractRawText({ buffer });
    if (docxText.value.trim()) return docxText.value;
  } catch {}

  // fallback
  return buffer.toString("utf8");
}
