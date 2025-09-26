import { CohereClient } from "cohere-ai";

export const handler = async (event) => {
  try {
    const { resumeText, jobDescription } = JSON.parse(event.body);
    if (!resumeText || !jobDescription) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing inputs" }) };
    }

    const cohere = new CohereClient({ token: process.env.VITE_COHERE_KEY });

    const response = await cohere.chat({
      model: "command-r-plus-08-2024",
      message: `
You are an expert career coach.
Write a concise, engaging cover letter based on the resume and job description.

Resume:
${resumeText}

Job Description:
${jobDescription}`
    });

    return { statusCode: 200, body: JSON.stringify({ coverLetter: response.text }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
