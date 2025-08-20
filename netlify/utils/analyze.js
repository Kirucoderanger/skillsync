import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeWithLLM(resumeText, jobJson) {
  const prompt = `
You are a career assistant. Analyze the following resume against this job description.

Resume:
${resumeText}

Job:
${JSON.stringify(jobJson, null, 2)}

Respond with:
1. Key strengths and gaps
2. Tailored resume text (professional, well-structured)
3. Suggested cover letter
4. Interview preparation questions
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const text = completion.choices[0].message.content;
  return {
    analysis: text,
    resume: text, // for now use same text for resume generation
    coverLetter: text,
  };
}
export async function parseResumeFile(fileBuffer) {
  // Use mammoth for docx, pdf-parse for pdf, or fallback to text
  try {
    const data = await mammoth.extractRawText({ buffer: fileBuffer });
    return data.value || '';
  } catch (err) {
    console.error("Error parsing docx:", err);
  }

  try {
    const data = await pdfParse(fileBuffer);
    return data.text || '';
  } catch (err) {
    console.error("Error parsing pdf:", err);
  }

  return fileBuffer.toString('utf8'); // fallback to raw text
}