import { callLLM, textToDocxBase64, textToPdfBase64 } from './utils.js';

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
    const { job, profile, type = 'resume', format = 'docx' } = JSON.parse(event.body || '{}');

    // Extract job skills (LLM)
    const jobSkillsPrompt = `Extract required skills from job description as JSON array: "${job.description}"`;
    const jobSkillsText = await callLLM(jobSkillsPrompt);
    let jobSkills = [];
    try { jobSkills = JSON.parse(jobSkillsText); } catch { jobSkills = jobSkillsText.split(/,|\n/).map(s=>s.trim()).filter(Boolean); }

    // Construct generation prompt
    let genPrompt = '';
    if (type === 'resume') {
      genPrompt = `Generate a professional, ATS-friendly resume in plain text for the job:
Job Title: ${job.title}
Company: ${job.company?.display_name || ''}
Job Description: ${job.description}
Candidate profile: ${JSON.stringify(profile)}
Job skills: ${JSON.stringify(jobSkills)}
Keep it concise. Output only the resume content.`;
    } else if (type === 'cover-letter') {
      genPrompt = `Write a concise, persuasive cover letter (1 page) for:
Company: ${job.company?.display_name || ''}
Role: ${job.title}
Job Description: ${job.description}
Candidate profile: ${JSON.stringify(profile)}
Address missing skills positively.
Output only the cover letter text.`;
    } else if (type === 'interview-questions') {
      genPrompt = `Generate 6 technical and 4 behavioral interview questions tailored to:
Role: ${job.title}
Job description: ${job.description}
Candidate gaps: ${JSON.stringify(profile.gaps || [])}
Output as plain text with bullets.`;
    }

    const generatedText = await callLLM(genPrompt);

    // return as file for resume/cover, or text for interview-questions
    if (type === 'interview-questions') {
      return { statusCode: 200, body: JSON.stringify({ text: generatedText }) };
    }

    // generate docx/pdf base64
    if (format === 'docx') {
      const out = await textToDocxBase64(generatedText, `${type}.docx`);
      return { statusCode: 200, body: JSON.stringify({ base64: out.base64, mime: out.mime, filename: out.filename, text: generatedText }) };
    } else {
      const out = await textToPdfBase64(generatedText, `${type}.pdf`);
      return { statusCode: 200, body: JSON.stringify({ base64: out.base64, mime: out.mime, filename: out.filename, text: generatedText }) };
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
