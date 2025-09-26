import { CohereClient } from "cohere-ai";

export const handler = async (event) => {
  try {
    const { jobDescription } = JSON.parse(event.body);
    if (!jobDescription) {
      return { statusCode: 400, body: JSON.stringify({ error: "Job description missing" }) };
    }

    const cohere = new CohereClient({ token: process.env.VITE_COHERE_KEY });

    const response = await cohere.chat({
      model: "command-r-plus-08-2024",
      message: `
You are an expert interviewer.
Generate 10 realistic interview questions based on this job description.

Job Description:
${jobDescription}`
    });

    return { statusCode: 200, body: JSON.stringify({ interviewQuestions: response.text }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
