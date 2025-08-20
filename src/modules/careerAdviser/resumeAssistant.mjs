import fs from "fs";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Utility: parse uploaded resume (PDF or DOCX)
export async function parseResume(filePath) {
  const ext = filePath.split(".").pop().toLowerCase();
  if (ext === "pdf") {
    const data = await pdfParse(fs.readFileSync(filePath));
    return data.text;
  } else if (ext === "docx") {
    const data = await mammoth.extractRawText({ path: filePath });
    return data.value;
  }
  throw new Error("Unsupported file type. Upload PDF or DOCX.");
}

// Compare resume text with job description
export function analyzeFit(resumeText, jobData) {
  const jobSkills = jobData.skills || [];
  const resumeLower = resumeText.toLowerCase();

  const matched = jobSkills.filter(skill =>
    resumeLower.includes(skill.toLowerCase())
  );

  const missing = jobSkills.filter(
    skill => !resumeLower.includes(skill.toLowerCase())
  );

  const fitScore = Math.round((matched.length / jobSkills.length) * 100);

  return { matched, missing, fitScore };
}

// Generate tailored resume (DOCX)
export async function generateResume(userData, jobData, analysis) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: userData.name, bold: true, size: 32 }),
            ],
          }),
          new Paragraph(jobData.title + " – Tailored Resume"),
          new Paragraph(" "),
          new Paragraph("Summary:"),
          new Paragraph(
            `Experienced professional tailored for the role of ${jobData.title} at ${jobData.company}.`
          ),
          new Paragraph(" "),
          new Paragraph("Matched Skills: " + analysis.matched.join(", ")),
          new Paragraph(" "),
          new Paragraph("Experience:"),
          ...userData.experience.map(exp =>
            new Paragraph(`- ${exp.role} at ${exp.company} (${exp.years})`)
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("tailored_resume.docx", buffer);
}
// Utility: extract text from uploaded resume file
export async function extractTextFromResume(filePath) {
  const resumeText = await parseResume(filePath);
  return resumeText;
}
