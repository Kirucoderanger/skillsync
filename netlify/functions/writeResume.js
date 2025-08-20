import { CohereClient } from "cohere-ai";

export const handler = async (event) => {
  try {
    const { resumeText, jobDescription, analysis } = JSON.parse(event.body);
    if (!resumeText || !jobDescription || !analysis) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing inputs" }) };
    }

    const cohere = new CohereClient({ token: process.env.VITE_COHERE_KEY });

    const response = await cohere.chat({
      model: "command-r-plus",
      message: `
You are a professional resume writer.
Rewrite the resume using the analysis and job description.

Analysis:
${JSON.stringify(analysis)}

Job Description:
${jobDescription}

Resume:
${resumeText}`
    });

    return { statusCode: 200, body: JSON.stringify({ rewrittenResume: response.text }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
